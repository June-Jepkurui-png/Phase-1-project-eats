document.addEventListener('DOMContentLoaded', function() {
    const foodItemsContainer = document.getElementById('foodItems');
    const orderList = document.getElementById('orderList');
    const totalCostDisplay = document.getElementById('totalCost');
    const submitOrderBtn = document.getElementById('submitOrderBtn');
  
    const API_URL = 'db.json'; // Replace with your actual API endpoint
  
    // Function to fetch food items from API
    async function fetchFoodItems() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayFoodItems(data); // Display fetched items on the page
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Function to display food items on the page
    function displayFoodItems(foodItems) {
      foodItems.forEach(item => {
        // Create column for each food item
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');
  
        // Create card container
        const card = document.createElement('div');
        card.classList.add('card');
  
        // Create image element
        const itemImg = document.createElement('img');
        itemImg.classList.add('card-img-top');
        itemImg.src = item.image; // Set image source from data
        itemImg.alt = item['type of food']; // Alt text for accessibility
  
        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
  
        // Create item name element
        const itemName = document.createElement('h5');
        itemName.classList.add('card-title');
        itemName.textContent = item['type of food'];
  
        // Create item location element
        const itemLocation = document.createElement('p');
        itemLocation.classList.add('card-text');
        itemLocation.textContent = `Location: ${item.location}`;
  
        // Create item price element
        const itemPrice = document.createElement('p');
        itemPrice.classList.add('card-text');
        itemPrice.textContent = `Price: $${item.price.toFixed(2)}`;
  
        // Create order button
        const orderBtn = document.createElement('button');
        orderBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'mt-2');
        orderBtn.textContent = 'Add to Order';
  
        // Event listener for order button
        orderBtn.addEventListener('click', function() {
          addToOrder(item);
        });
  
        // Append elements to card body
        cardBody.appendChild(itemName);
        cardBody.appendChild(itemLocation);
        cardBody.appendChild(itemPrice);
        cardBody.appendChild(orderBtn);
  
        // Append image and card body to card
        card.appendChild(itemImg);
        card.appendChild(cardBody);
  
        // Append card to column
        col.appendChild(card);
  
        // Append column to food items container
        foodItemsContainer.appendChild(col);
      });
    }
  
    // Function to add selected item to the order summary
    function addToOrder(item) {
      // Create list item for order
      const orderItem = document.createElement('li');
      orderItem.classList.add('list-group-item');
      orderItem.textContent = `${item['type of food']} - $${item.price.toFixed(2)}`;
  
      // Create remove button for order item
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
      removeBtn.textContent = 'Remove';
  
      // Event listener for remove button
      removeBtn.addEventListener('click', function() {
        orderItem.remove(); // Remove order item from list
        updateTotalCost(); // Update total cost display
      });
  
      // Append remove button to order item
      orderItem.appendChild(removeBtn);
  
      // Append order item to order list
      orderList.appendChild(orderItem);
  
      // Update total cost display
      updateTotalCost();
    }
  
    // Function to calculate and update total cost of the order
    function updateTotalCost() {
      let totalCost = 0;
      const orderItems = orderList.querySelectorAll('li');
  
      // Calculate total cost from order items
      orderItems.forEach(item => {
        const priceText = item.textContent.split(' - ')[1]; // Extract price text
        const price = parseFloat(priceText.replace('$', '')); // Convert price to float
        totalCost += price; // Accumulate total cost
      });
  
      // Display total cost with 2 decimal places
      totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
    }
  
    // Event listener for submit order button
    submitOrderBtn.addEventListener('click', function() {
      alert('Order submitted!'); // Placeholder for actual backend integration
      orderList.innerHTML = ''; // Clear order list
      updateTotalCost(); // Reset total cost display
    });
  
    // Initialize the application
    fetchFoodItems(); // Fetch and display food items when DOM is loaded
  });
  