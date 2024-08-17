import mysqlConnection from 'mysql2/promise';
 
const properties = {
    host:'localhost',
    user:'root',
    password: '',
    database: 'prot4-37394511',
};

export const pool =  mysqlConnection.createPool(properties);



