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
### Stored Procedure1
```
DELIMITER //
CREATE PROCEDURE gender_risk_level(IN user_id INT, IN user_gender VARCHAR(10))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE condition_name VARCHAR(255);
    DECLARE patient_count INT;
    DECLARE sex VARCHAR(10);
    DECLARE condition_risk_level VARCHAR(20);
    DECLARE cur CURSOR FOR
        SELECT c.name, COUNT(*) AS patients, u.sex
        FROM USER u
        JOIN diagnosed_with d ON u.user_id = d.user_id
        JOIN CONDITIONS c ON d.condition_id = c.trackable_id
        GROUP BY u.sex, c.name
        ORDER BY u.sex, patients DESC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;


    CREATE TEMPORARY TABLE IF NOT EXISTS temp_conditions (
        condition_name VARCHAR(255),
        patient_count INT,
        sex VARCHAR(10),
        condition_risk_level VARCHAR(20)
    );

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO condition_name, patient_count, sex;
        IF done THEN
            LEAVE read_loop;
        END IF;

        IF sex <> user_gender THEN
        ITERATE read_loop;
        END IF;

        IF patient_count > 10 THEN
            SET condition_risk_level = 'Highest Risk';
        ELSEIF patient_count < 10 AND patient_count >= 5 THEN
            SET condition_risk_level = 'Medium Risk';
        ELSE
            SET condition_risk_level = 'Low Risk';
        END IF;

        INSERT INTO temp_conditions (condition_name, patient_count, sex, condition_risk_level)
        VALUES (condition_name, patient_count, sex, condition_risk_level);
    END LOOP;

    CLOSE cur;

    SELECT * FROM temp_conditions LIMIT 10;

    DROP TEMPORARY TABLE IF EXISTS temp_conditions;
END //
DELIMITER ;

```

### Stored Procedure2
```
DELIMITER //
CREATE PROCEDURE c_risk_level(IN user_id INT, IN user_country VARCHAR(255))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE condition_name VARCHAR(255);
    DECLARE patient_count INT;
    DECLARE country VARCHAR(255);
    DECLARE condition_risk_level VARCHAR(20);
    DECLARE cur CURSOR FOR
        SELECT c.name, COUNT(*) AS patients, u.country
        FROM USER u
        JOIN diagnosed_with d ON u.user_id = d.user_id
        JOIN CONDITIONS c ON d.condition_id = c.trackable_id
        GROUP BY u.country, c.name
        ORDER BY u.country, patients DESC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;


    CREATE TEMPORARY TABLE IF NOT EXISTS temp_conditions (
        condition_name VARCHAR(255),
        patient_count INT,
        country VARCHAR(255),
        condition_risk_level VARCHAR(20)
    );

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO condition_name, patient_count, country;
        IF done THEN
            LEAVE read_loop;
        END IF;

        IF country <> user_country THEN
        ITERATE read_loop;
        END IF;

        IF patient_count > 10 THEN
            SET condition_risk_level = 'Highest Risk';
        ELSEIF patient_count < 10 AND patient_count >= 5 THEN
            SET condition_risk_level = 'Medium Risk';
        ELSE
            SET condition_risk_level = 'Low Risk';
        END IF;

        INSERT INTO temp_conditions (condition_name, patient_count, country, condition_risk_level)
        VALUES (condition_name, patient_count, country, condition_risk_level);
    END LOOP;

    CLOSE cur;

    SELECT * FROM temp_conditions LIMIT 10;

    DROP TEMPORARY TABLE IF EXISTS temp_conditions;
END //
DELIMITER ;

```
### Trigger
```
DELIMITER //

CREATE TRIGGER update_conditions_patient_count
AFTER INSERT ON diagnosed_with
FOR EACH ROW
BEGIN
    UPDATE CONDITIONS
    SET amount_of_patient = amount_of_patient + 1
    WHERE trackable_id = NEW.condition_id;
END //

DELIMITER ;
```
### notes
* After a deep look into our dataset, we found out that the data on treatment is quite unclear, and the most significant parts are only the conditions and symptoms. Therefore, we decided to only focus on those parts.
* The correlation between conditions and symptoms is based on the dataset, so it should be realistic.
