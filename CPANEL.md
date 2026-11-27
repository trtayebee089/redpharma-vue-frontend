# Automatic storefront deployment

Push source changes to `cpanel-production`. GitHub Actions runs the tests, builds the Vue storefront, and publishes the build to `cpanel-ready`. The cPanel cron job checks for a build every five minutes and applies it to `public_html`. Deployment uses the public repository and needs no cPanel credentials in GitHub.

If the build fails, the currently published website stays live. Actions logs show build and publish errors. cPanel deployment status is recorded in `~/.redpharma-frontend-builds`, including the prior index page for rollback.

For a fresh cPanel setup or to update the server-side pull script, use **Git Version Control → RedPharma Storefront → Update from Remote → Deploy HEAD Commit** on `cpanel-production`. The deployment command installs the pull script in the account home directory. Configure **Cron Jobs** to run `/bin/bash ~/.redpharma-frontend-pull.sh` every five minutes.
