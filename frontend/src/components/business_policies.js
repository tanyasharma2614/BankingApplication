// business_policies.js
console.log('Script Start loaded!');

function fetchPolicyNames() {
    console.log('Script loaded!');

    fetch('http://localhost:8080/api/getAllPolicyNames')
        .then(response => response.json())
        .then(data => {
            const policyList = document.getElementById('policyList');

            if (data.success && data.data.length > 0) {
                data.data.forEach(policy => {
                    const listItemBox = document.createElement('div');
                    listItemBox.classList.add('list-item-box');

                    const listItem = document.createElement('li');
                    listItem.textContent = policy.Policy_Name;
                    listItemBox.appendChild(listItem);

                    listItemBox.addEventListener('click', () => {
                        const policyName = encodeURIComponent(policy.Policy_Name);
                        window.location.href = `business_policy.html?Policy_Name=${policyName}`;
                    });

                    policyList.appendChild(listItemBox);
                });
            } else {
                const message = document.createElement('p');
                message.textContent = 'No policy names found.';
                policyList.appendChild(message);
            }
        })
        .catch(error => {
            console.error('Error fetching policy names:', error);
            throw error; // Re-throw the error to indicate failure
        });
}


