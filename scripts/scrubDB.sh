sudo docker kill djangoapp
sudo docker cp scripts/remove.sql angulardjangomir_db_1:/scrub.sql && sudo docker exec angulardjangomir_db_1 psql -d db2 -U database1_role -f scrub.sql