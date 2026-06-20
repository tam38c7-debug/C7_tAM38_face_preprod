
#!/bin/bash
# deploy/scripts/setup-logs.sh

set -e

# Create log directories
mkdir -p /var/log/zodiac/generator

# Set permissions
chmod 755 /var/log/zodiac
chmod 777 /var/log/zodiac/generator


# Create log files with proper permissions
touch /var/log/zodiac/generator/generator.log
chmod 666 /var/log/zodiac/generator/generator.log

echo "Log directories created and permissions set"


