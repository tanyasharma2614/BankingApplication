// business_policies.js

console.log('Script Start loaded!');

document.addEventListener("DOMContentLoaded", function () {
    fetchPolicyNames();
});

function fetchPolicyNames() {
    console.log('Script loaded!');

    const listContainer = document.getElementById('policyList');

    fetch('http://localhost:8080/api/getAllPolicyNames')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                data.data.forEach(policy => {
                    const listItemBox = document.createElement('div');
                    listItemBox.classList.add('list-item-box');

                    const listItem = document.createElement('div');
                    listItem.classList.add('list-item-name'); // Add the class for name styling
                    listItem.textContent = policy.Policy_Name;
                    listItemBox.appendChild(listItem);

                    // Add a div for description under each list item
                    const expandedDetailsContainer = document.createElement('div');
                    expandedDetailsContainer.classList.add('expanded-details-container');
                    listItemBox.appendChild(expandedDetailsContainer);

                    const descriptionDiv = document.createElement('div');
                    descriptionDiv.classList.add('expanded-details');
                    expandedDetailsContainer.appendChild(descriptionDiv);

                    listItemBox.addEventListener('click', () => {
                        // Toggle the visibility of the expanded details container
                        expandedDetailsContainer.classList.toggle('visible');

                        const policyName = encodeURIComponent(policy.Policy_Name);
                        displayPolicyDetails(policyName, descriptionDiv);
                    });

                    listContainer.appendChild(listItemBox);
                });
            } else {
                const message = document.createElement('p');
                message.textContent = 'No policy names found.';
                listContainer.appendChild(message);
            }
        })
        .catch(error => {
            console.error('Error fetching policy names:', error);
            throw error;
        });
}

function displayPolicyDetails(policyName, descriptionDiv) {
    // Fetch policy details using the policy name
    fetch(`http://localhost:8080/api/getPolicyDesc?policyname=${policyName}`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                const policyDesc = data.data[0].Policy_Desc;
                descriptionDiv.innerHTML = `<p class="expanded-details">${policyDesc}</p>`;
            } else {
                descriptionDiv.innerHTML = '<p class="expanded-details">Policy details not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching policy details:', error);
        });
}
