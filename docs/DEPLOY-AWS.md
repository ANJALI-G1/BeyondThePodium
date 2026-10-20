# Deploying to AWS (S3 + CloudFront + GitHub Actions)

```
GitHub push → Actions: lint + build → out/ ─sync─▶ S3 (private bucket)
                                                     │  Origin Access Control
Visitor ─HTTPS─▶ CloudFront (CDN, ACM cert, URL-rewrite function) ◀┘
```

**Cost:** for a small static site this typically stays within AWS free allowances or costs cents per month. A Route 53 hosted zone (≈ US$0.50/month) and the domain itself are paid. AWS changed its Free Tier in July 2025 — check current pricing for your account and **set a billing alert first** (Billing → Budgets → "Zero spend budget").

Pick one region and use it throughout (e.g. `ap-south-1` Mumbai). The ACM certificate for CloudFront must be in **`us-east-1`**.

---

## 1. S3 bucket

1. S3 → **Create bucket**, e.g. `beyondthepodium-site`.
2. Keep **Block all public access ON** (CloudFront reads it privately). No static-website hosting needed.

## 2. CloudFront Function (clean URLs)

CloudFront → **Functions** → Create `btp-rewrite` (runtime `cloudfront-js-2.0`) → paste `infra/cloudfront-function.js` → **Publish**.

## 3. CloudFront distribution

1. CloudFront → **Create distribution**. Origin: your S3 bucket (the REST endpoint, not website endpoint).
2. **Origin access:** *Origin access control settings* → create OAC → after creating, click **Copy policy** and paste it into the bucket's *Permissions → Bucket policy*.
3. **Viewer protocol policy:** Redirect HTTP to HTTPS. **Cache policy:** `CachingOptimized`. **Compress:** Yes.
4. **Function associations:** Viewer request → CloudFront Function → `btp-rewrite`.
5. **Default root object:** `index.html`.
6. After creation → **Error pages** → create custom error responses for **403** and **404** → response page `/404.html`, HTTP code `404`.
7. Note the **Distribution ID** and the `xxxx.cloudfront.net` domain — the site will live there until a custom domain is added.

## 4. (Optional) Custom domain

1. **ACM (us-east-1)** → Request public certificate for `example.com` and `www.example.com` → DNS validation.
2. Route 53 → hosted zone for the domain (or add the CNAMEs at your registrar) → validate.
3. CloudFront → Edit → **Alternate domain names** + choose the certificate.
4. Route 53 → **A / AAAA alias** records → the CloudFront distribution.

## 5. GitHub → AWS without access keys (OIDC)

1. IAM → **Identity providers** → Add → OpenID Connect
   - URL `https://token.actions.githubusercontent.com`, audience `sts.amazonaws.com`.
2. IAM → **Roles** → Create role → *Custom trust policy* → paste `infra/github-oidc-trust-policy.json` (fill account ID, GitHub user, repo).
3. Add an inline policy from `infra/deploy-role-policy.json` (fill bucket, account ID, distribution ID). Copy the **role ARN**.

## 6. GitHub repository settings

Settings → Secrets and variables → Actions:

| Type | Name | Example |
|---|---|---|
| Secret | `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/btp-deploy` |
| Variable | `AWS_REGION` | `ap-south-1` |
| Variable | `S3_BUCKET` | `beyondthepodium-site` |
| Variable | `CLOUDFRONT_DISTRIBUTION_ID` | `E1ABCDEF2GHIJK` |
| Variable | `SITE_URL` | `https://www.example.com` (or the cloudfront.net URL) |
| Variable | `FORM_ENDPOINT` | your Apps Script `/exec` URL (optional) |

## 7. Deploy

```bash
git add . && git commit -m "Launch site"
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

`.github/workflows/deploy.yml` builds, uploads to S3 (hashed assets cached 1 year, HTML always revalidated) and invalidates CloudFront. Re-run anytime via **Actions → Run workflow**.

**Manual deploy (no CI)** — with the AWS CLI configured:

```bash
npm run build
aws s3 sync out/ s3://<bucket> --delete
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `AccessDenied` XML on every page | Bucket policy from the OAC "Copy policy" step is missing. |
| `/insights/` works but `/insights/slug/` 403s | CloudFront Function not associated (viewer request) or not published. |
| Old content after deploy | Check the invalidation step ran; hard-refresh the browser. |
| Action fails at "Configure AWS credentials" | Trust policy `sub` must match `repo:<user>/<repo>:ref:refs/heads/main` exactly. |
