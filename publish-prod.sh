ng build

ssh -p1088 -oStrictHostKeyChecking=no eneasys@cpanel.sm-host.com "rm -rf api-gest.eneasys.com/public_html"
scp -P1088 -r dist/public_html/ eneasys@cpanel.sm-host.com:api-gest.eneasys.com/public_html