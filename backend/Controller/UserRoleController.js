const { UserRole } = require('../Model/userrole');


// @METHOD GET
// API: http://localhost:5000/admin/userrole
async function getUserRoles(req, res) {
    try {
        const userRoles = await UserRole.find();
        return res.status(200).json(userRoles);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error fetching user roles' });
    }
}


// @METHOD GET
// API: http://localhost:5000/admin/userrole/:id
async function getUserRoleById(req, res) {
    const { id } = req.params;

    try {
        const userRole = await UserRole.findOne({ userroleid: id });

        if (!userRole) {
            return res.status(404).send({ error: 'User role not found' });
        }
        return res.status(200).json(userRole);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error fetching user role' });
    }
}


// @METHOD POST
// API: http://localhost:5000/admin/userrole


async function generateUserRoleId() {
    try {
        const latestUserRole = await UserRole.findOne().sort({ userroleid: -1 });

        if (latestUserRole) {
            return latestUserRole.userroleid + 1;
        } else {
            return 1;
        }
    } catch (error) {
        console.log('Error generating userroleid:', error);
        throw error;
    }
}



async function addUserRole(req, res) {
    const { userrole, userroledescription, status } = req.body;

    try {
        const existingRole = await UserRole.findOne({ userrole: userrole.toLowerCase() });

        if (existingRole) {
            return res.status(400).json({ error: 'User role already exists' });
        }

        const userroleid = await generateUserRoleId();

        const newUserRole = new UserRole({
            userroleid: userroleid,
            userrole: userrole.toLowerCase(),
            userroledescription: userroledescription,
            status: status.toLowerCase(),
        });

        const savedUserRole = await newUserRole.save();

        return res.status(201).json(savedUserRole);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error adding user role' });
    }
}



// @METHOD PUT
// API: http://localhost:5000/admin/userrole/:id
async function updateUserRole(req, res) {
    const { id } = req.params;
    const { userrole, userroledescription, status } = req.body;

    try {
        // Find the user role by userroleid
        const userRole = await UserRole.findOne({ userroleid: id });

        if (!userRole) {
            return res.status(404).send({ error: 'User role not found' });
        }

        if (userrole) userRole.userrole = userrole.toLowerCase();
        if (userroledescription) userRole.userroledescription = userroledescription.toLowerCase();
        if (status) userRole.status = status.toLowerCase();

        const updatedUserRole = await userRole.save();
        return res.status(200).json(updatedUserRole);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error updating user role' });
    }
}



// @METHOD DELETE
// API: http://localhost:5000/admin/userrole/:id
async function deleteUserRole(req, res) {
    const userroleId = req.params.id;

    try {
        const deletedUserRole = await UserRole.findOneAndDelete({ userroleid: userroleId });

        if (!deletedUserRole) {
            return res.status(404).send({ error: 'User role not found' });
        }

        return res.status(200).send({ message: 'User role deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error deleting user role' });
    }
}


module.exports = {
    getUserRoles,
    getUserRoleById,
    addUserRole,
    updateUserRole,
    deleteUserRole,
}