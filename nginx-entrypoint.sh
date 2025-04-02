#!/bin/sh

# Replace placeholders with environment variables
cat <<EOF > /usr/share/nginx/html/config.js
window.__RUNTIME_CONFIG__ = {
  CLERK_PUBLISHABLE_KEY: "${CLERK_PUBLISHABLE_KEY}"
};
EOF

exec "$@"
