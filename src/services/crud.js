const db = require('../Configs/db');
const sendResponse = require('../utils/clientjsonmaker');

const insertData = async (req, res) => {
    const { FirstName, LastName, City } = req.body;
    if (!FirstName || !LastName || !City) {
        return sendResponse.sendResponse(res, 400, 'First Name, Last Name, and City cannot be empty', null);
    }
    try {
        const [rows, fields] = await db.execute(
            'INSERT INTO userDetails  (FirstName, LastName, City) VALUES (?, ?, ?)',
            [FirstName, LastName, City]
        );
        console.log('Data inserted successfully!', rows);
        return sendResponse.sendResponse(res, 200, 'Data inserted successfully!', rows);
    } catch (err) {
        console.error('Error inserting data:', err.message);
        return sendResponse.sendResponse(res, 500, 'Error inserting data', null);
    }
};


const getAllData = async (req, res) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM userDetails');
        return sendResponse.sendResponse(res, 200, 'Data retrieved successfully!', rows);
    } catch (err) {
        console.error('Error getting data:', err.message);
        return sendResponse.sendResponse(res, 500, 'Error getting data', null);
    }
};


const updateDataById = async (req, res) => {
    const { FirstName, LastName, City, id } = req.body;

    try {
        if (!FirstName || !LastName || !City || !id) {
            return sendResponse.sendResponse(res, 400, 'Invalid input data', null);
        }

        const [rows, fields] = await db.execute(
            'UPDATE userDetails SET FirstName = ?, LastName = ?, City = ? WHERE ID = ?',
            [FirstName, LastName, City, id]
        );

        console.log('Data updated successfully!', rows);
        return sendResponse.sendResponse(res, 200, 'Data updated successfully!', rows);
    } catch (err) {
        console.error('Error updating data:', err.message);
        return sendResponse.sendResponse(res, 500, `Error updating data: ${err.message}`, null);
    }
};



const deleteDataById = async (req, res) => {
    const { id } = req.body;
    console.log('Received ID:', id);
    if (id === undefined || id === null) {
        return sendResponse.sendResponse(res, 400, 'Invalid ID', null);
    }
    try {
        const [rows, fields] = await db.execute('DELETE FROM userDetails WHERE ID = ?', [id]);
        console.log('Data deleted successfully!', rows);
        return sendResponse.sendResponse(res, 200, 'Data deleted successfully!', rows);
    } catch (err) {
        console.error('Error deleting data:', err.message);
        return sendResponse.sendResponse(res, 500, 'Error deleting data', null);
    }

};



module.exports = {
    insertData,
    getAllData,
    updateDataById,
    deleteDataById
};
