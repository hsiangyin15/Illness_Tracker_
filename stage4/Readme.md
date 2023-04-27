# Database System - PT1 Sstage 5 
To run frontend:

```bash
cd ./frontend/
sudo npm install create-react-app -g
npm start
```

To run backend:

```bash
cd ./backend/
npm install axios --save
npm run devStart
```
### fetures done
- [x] Basic UI interface
- [x] Learn about various conditions(illnesses)
- [x] Learn symptoms associated with certain conditions (Symptom Checker) 
- [x] Symptoms and conditions correlations
- [x] Wishlist of specific symptoms/conditions
- [x] User reporting 
- [x] User management
- [x] Trigger for inserting condition added
- [x] stored procedure

### Advance Query 
```
SELECT c.name, COUNT(*) AS patients
FROM USER u
JOIN diagnosed_with d ON u.user_id = d.user_id
JOIN CONDITIONS c ON d.condition_id = c.trackable_id
GROUP BY u.sex, c.name
ORDER BY u.sex, patients DESC
LIMIT 5;

SELECT c.name, COUNT(*) AS patients
FROM USER u
JOIN diagnosed_with d ON u.user_id = d.user_id
JOIN CONDITIONS c ON d.condition_id = c.trackable_id
GROUP BY u.country, c.name
ORDER BY u.country, patients DESC
LIMIT 5;
```
### Trigger
```
SELECT c.name, COUNT(*) AS patients
FROM USER u
JOIN diagnosed_with d ON u.user_id = d.user_id
JOIN CONDITIONS c ON d.condition_id = c.trackable_id
GROUP BY u.sex, c.name
ORDER BY u.sex, patients DESC
LIMIT 10;

SELECT c.name, COUNT(*) AS patients
FROM CS411.USER u
JOIN CS411.diagnosed_with d ON u.user_id = d.user_id
JOIN CS411.CONDITIONS c ON d.condition_id = c.trackable_id
GROUP BY u.country, c.name
ORDER BY u.country, patients DESC
LIMIT 10;
```
### notes
* After a deep look into our dataset, we found out that the data on treatment is quite unclear, and the most significant parts are only the conditions and symptoms. Therefore, we decided to only focus on those parts.
* The correlation between conditions and symptoms is based on the dataset, so it should be realistic.
