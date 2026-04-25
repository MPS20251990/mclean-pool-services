# Review Moderation Workflow

## Current Process (Manual)
1. Customer submits review via /pages/reviews.html form
2. Netlify Forms captures submission
3. Email notification sent to admin
4. Admin calls approve endpoint:
   ```
   curl -X POST https://YOUR-SITE.netlify.app/api/approve-review \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"reviewId": "REVIEW_ID", "action": "approve"}'
   ```
5. Run `npm run build:reviews` to merge approved reviews
6. Commit and push updated data files

## Review States
- **pending** — Submitted, awaiting moderation
- **approved** — Approved, visible on site after build
- **rejected** — Rejected, removed from pending

## Review Object Schema
```json
{
  "id": "unique-id",
  "name": "Customer Name",# Review Moderation Workflow

## Current Process (Manual)

### When a customer submits a review:

1. Customer fills out the review form on `/pages/reviews.html`
2. Netlify Forms captures the submission automatically
3. You receive an email notification (configured in Netlify UI)
4. Go to Netlify Dashboard > Site > Forms > review-submission
5. Read the submitted review

### To approve a review:

1. Open `data/reviews.json` in the GitHub web editor
2. Add a new entry:
   ```json
   {
     "id": "rev_004",
     "name": "Customer Name",
     "rating": 5,
     "text": "Their review text here.",
     "date": "2026-04-25",
     "status": "approved"
   }
   ```
3. Commit the change to `main`
4. Netlify auto-deploys -- review appears on site within ~60 seconds

### To reject a review:
- Simply ignore it or mark as spam in the Netlify Forms dashboard

## Future Process (Automated)

When a database (Supabase/Firebase) is connected:

1. Customer submits review > `submit-review.mjs` saves to pending queue
2. Owner receives email/Slack notification with review details
3. Owner calls the approval API:
   ```bash
   curl -X POST https://your-site.netlify.app/api/approve-review \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"review_id": "rev_xxx", "action": "approve"}'
   ```
4. Function moves review from pending to approved
5. Site rebuilds automatically

## Spam Protection

- Honeypot field (`bot-field`) catches automated bots
- Netlify's built-in spam filtering
- Manual review ensures quality control
  "rating": 5,
  "text": "Review text...",
  "date": "2026-01-15",
  "status": "pending"
}
```

## Future Automation
See AUTOMATION-ROADMAP.md for planned improvements including:
- Admin dashboard for one-click approve/reject
- Automatic rebuild on review approval
- Star rating aggregation
- Automated email notifications to reviewers
