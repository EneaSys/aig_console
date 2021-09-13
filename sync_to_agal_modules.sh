echo;
echo;
echo;

i=0
while read line
do
	echo "----------- $line -------"
	rsync -av --delete src/$line ../webapp 
    echo $line
	echo;
	echo;

    (( i++ ))
done < <(ls ../webapp/ | grep '@agal-')
