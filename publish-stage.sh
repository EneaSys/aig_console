STARTTIME=$(date)

ng build

ssh -p1088 -oStrictHostKeyChecking=no eneasys@cpanel.sm-host.com "rm -rf stage.eneasys.com/api-gest/public_html"
scp -P1088 -r dist/public_html/ eneasys@cpanel.sm-host.com:stage.eneasys.com/api-gest/public_html


ENDTIME=$(date)

RUNTIME=$((ENDTIME-STARTTIME))

echo "Seconds ${RUNTIME} in sec"