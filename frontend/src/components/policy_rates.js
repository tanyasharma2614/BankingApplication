// policy_rates.js

console.log('Policy Rates Script Loaded!');

document.addEventListener("DOMContentLoaded", function () {
    fetchPolicyRates();
});
function openInsertDialog() {
    // Prompt for new rate and value
    const newRate = prompt('Enter new name:');
    const newValue = prompt('Enter new rate:');
    if (newRate !== null && newValue !== null) {
        insertPolicyRate({ Policy_Name: newRate, rate: parseInt(newValue) });
    }
}
function fetchPolicyRates() {
    const policyRatesTable = document.getElementById('policyRatesTable');

    // Clear the existing content of the table
    policyRatesTable.innerHTML = '';

    fetch('http://localhost:8080/api/getAllPolicyRates')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                const policyRates = data.data;

                const table = document.createElement('table');
                const headerRow = table.insertRow(0);

                // Add table headers
                Object.keys(policyRates[0]).forEach(key => {
                    const th = document.createElement('th');
                    th.textContent = key;
                    headerRow.appendChild(th);
                });

                const actionHeader = document.createElement('th');
                actionHeader.textContent = 'Actions';
                headerRow.appendChild(actionHeader);

                // Add table rows with data and buttons
                policyRates.forEach(policyRate => {
                    const row = table.insertRow();

                    Object.entries(policyRate).forEach(([key, value]) => {
                        const cell = row.insertCell();
                        cell.textContent = value;
                    });

                    const actionCell = row.insertCell();

                    // Add "Update Rate" button
                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Update Rate';
                    updateButton.classList.add('update-button'); // Apply the update-button class
                    updateButton.addEventListener('click', () => {
                        // Prompt for the new rate
                        const newRate = prompt('Enter new rate:');
                        if (newRate !== null) {
                            updatePolicyRate(policyRate.Policy_Name, newRate, row);
                        }
                    });
                    actionCell.appendChild(updateButton);

                    // Add "Delete Rate" button
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete Rate';
                    deleteButton.classList.add('delete-button'); // Apply the delete-button class
                    deleteButton.addEventListener('click', () => {
                        deletePolicyRate(policyRate.Policy_Name, row);
                    });
                    actionCell.appendChild(deleteButton);

                    // Set a style for horizontal layout
                    actionCell.style.display = 'flex';
                    actionCell.style.gap = '5px';
                });

                policyRatesTable.appendChild(table);
            } else {
                const message = document.createElement('p');
                message.textContent = 'No policy rates found.';
                policyRatesTable.appendChild(message);
            }
        })
        .catch(error => {
            console.error('Error fetching policy rates:', error);
            throw error;
        });
}

function updatePolicyRate(policyName, newRate, row) {
    const updateData = {
        Policy_Name: policyName,
        rate: parseFloat(newRate)
    };

    fetch('http://localhost:8080/api/updatePolicyRate', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Policy rate updated successfully!');
                // Update the displayed value on the page
                row.cells[row.cells.length - 2].textContent = newRate; // Assuming the rate column is the second-to-last column
            } else {
                alert('Failed to update policy rate.');
            }
        })
        .catch(error => {
            console.error('Error updating policy rate:', error);
        });
}

function insertPolicyRate(newPolicyRate) {
    console.log('Inserting policy rate:', newPolicyRate);

    fetch('http://localhost:8080/api/insertPolicyRates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPolicyRate)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Insert response:', data);

            if (data && data.success) {
                alert('Policy rate inserted successfully!');
                // Refresh the table or handle the insert as needed
                fetchPolicyRates();
            } else {
                const errorMessage = data && data.message ? data.message : 'Unknown error';
                alert(`Failed to insert policy rate. Error: ${errorMessage}`);
            }
        })
        .catch(error => {
            console.error('Error inserting policy rate:', error);
            alert('An error occurred while inserting the policy rate.');
        });
}

function deletePolicyRate(policyName, row) {
    if (confirm(`Are you sure you want to delete the policy rate for ${policyName}?`)) {
        fetch(`http://localhost:8080/api/deletePolicyRate?policyname=${encodeURIComponent(policyName)}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Policy rate deleted successfully!');
                    // Remove the deleted row from the table
                    row.remove();
                } else {
                    alert('Failed to delete policy rate.');
                }
            })
            .catch(error => {
                console.error('Error deleting policy rate:', error);
            });
    }
}
