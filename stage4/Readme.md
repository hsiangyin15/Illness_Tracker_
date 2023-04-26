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



### notes
* After a deep look into our dataset, we found out that the data on treatment is quite unclear, and the most significant parts are only the conditions and symptoms. Therefore, we decided to only focus on those parts.
* The correlation between conditions and symptoms is based on the dataset, so it should be realistic.
