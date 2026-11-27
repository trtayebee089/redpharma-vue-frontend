# cPanel storefront deployment

The `cpanel-production` branch carries the reviewed storefront source and the prebuilt files for the next live release under `release/`. cPanel does not need Node.js to deploy these files.

1. Commit the new storefront entry page and its assets to `release/` on `cpanel-production` and push the branch to GitHub.
2. In cPanel, open **Git Version Control**, select **RedPharma Storefront**, and open **Pull or Deploy**.
3. Select **Update from Remote**, then **Deploy HEAD Commit**.

Deployments publish assets before switching the storefront entry page. The prior entry page is saved in `~/.redpharma-storefront-backups/index.previous.html`, and existing assets remain available for rollback.
