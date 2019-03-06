init();
const removeButtons = document.querySelectorAll(".removeFromCart");
for (let i = 0; i<removeButtons.length;i++) {
    removeButtons[i].addEventListener("click", removeCartItem);
}

function removeCartItem(e) {
    const target = e.target;
    const posts = document.querySelector("#posts");
    posts.removeChild(target.parentElement);
    //Make a server call to remove the item
    //Check whether the shopping cart is empty, replace with an
    // information if there is no item in shopping cart.
    const currentPosts = document.querySelectorAll(".post");
    if (currentPosts.length === 0) {
        const endOfResult = document.querySelector("#endOfResults");
        posts.removeChild(endOfResult);

        const emptyInfoDiv = document.createElement("div");
        emptyInfoDiv.id = "emptyInformation";
        const text = document.createTextNode("Your shopping cart is currently empty");

        emptyInfoDiv.appendChild(text);
        document.querySelector("#posts").appendChild(emptyInfoDiv);
    }
}

function init() {
    //Get the User from server here
    //User users[0] as an demonstration.
    const user = users[0];
    //Update the profile photo on top right corner
    const userInfoDiv = document.querySelector("#userInfo");
    userInfoDiv.removeChild(userInfoDiv.lastElementChild);
    const a = document.createElement("a");
    a.setAttribute("href", "./userProfile.html");
    const image = document.createElement("img");
    image.setAttribute("src", user.avatar);
    image.setAttribute("alt", "user profile photo");
    image.className = "loginProfilePhoto";
    a.appendChild(image);
    userInfoDiv.appendChild(a);


    const basket = user.shortlist;
    //Remove items hard-coded in the html file
    const posts = document.querySelector("#posts");
    while (posts.lastElementChild) {
        posts.removeChild(posts.lastElementChild);
    }
    if (user.shortlist.length === 0) {
        const emptyInfoDiv = document.createElement("div");
        emptyInfoDiv.id = "emptyInformation";
        const text = document.createTextNode("Your shopping cart is currently empty");

        emptyInfoDiv.appendChild(text);
        document.querySelector("#posts").appendChild(emptyInfoDiv);
    } else {
        for (let i = 0; i<basket.length;i++) {
            const postDiv = document.createElement("div");
            postDiv.className = "post";

            const sellerProfilePhoto = document.createElement("img");
            sellerProfilePhoto.className="profilePhoto";
            sellerProfilePhoto.setAttribute("src", basket[i].seller.avatar);
            sellerProfilePhoto.setAttribute("alt", "sellerPhoto");

            const sellerNameSpan = document.createElement("span");
            sellerNameSpan.className="userName";
            sellerNameSpan.appendChild(document.createTextNode(basket[i].seller.user.firstName + " " + basket[i].seller.user.lastName));

            postDiv.appendChild(sellerProfilePhoto);
            postDiv.appendChild(sellerNameSpan);
            postDiv.appendChild(document.createElement("br"));

            const postIdSpan = document.createElement("span");
            postIdSpan.className = "postId";
            const postIdNumber = document.createElement("span");
            postIdNumber.className = "postIdNumber";
            postIdNumber.appendChild(document.createTextNode(basket[i].postId));
            postIdSpan.appendChild(postIdNumber);
            postDiv.appendChild(postIdSpan);

            const categorySpan = document.createElement("span");
            categorySpan.className = "category";
            categorySpan.appendChild(document.createTextNode(basket[i].title));
            postDiv.appendChild(categorySpan);

            const conditionSpan = document.createElement("span");
            conditionSpan.className = "condition";
            conditionSpan.appendChild(document.createTextNode("Condition: " + basket[i].condition));
            postDiv.appendChild(conditionSpan);

            const timeSpan = document.createElement("span");
            timeSpan.className = "timespan";
            timeSpan.appendChild(document.createTextNode("Posting Time: " + basket[i].postingDate));
            postDiv.appendChild(timeSpan);

            const descriptionDiv = document.createElement("div");
            descriptionDiv.className="description";
            descriptionDiv.appendChild(document.createTextNode(basket[i].description));
            postDiv.appendChild(descriptionDiv);

            const priceDiv = document.createElement("div");
            priceDiv.className = "price";
            priceDiv.appendChild(document.createTextNode("CAD "+basket[i].price));
            postDiv.appendChild(priceDiv);

            if (basket[i].images.length > 0) {
                const pictureContainer = document.createElement("div");
                const lightboxAttr = `pictureSet${i}`;
                for (let k=0;k<basket[i].images.length;k++) {
                    const a = document.createElement("a");
                    a.setAttribute("href", basket[i].images[k]);
                    a.setAttribute("data-lightbox",lightboxAttr);
                    const image = document.createElement("img");
                    image.className = "itemPicture";
                    image.setAttribute("src", basket[i].images[k]);
                    a.appendChild(image);
                    pictureContainer.appendChild(a);
                }
                postDiv.appendChild(pictureContainer);
            }

            postDiv.appendChild(document.createElement("hr"));

            const removeButton = document.createElement("button");
            removeButton.className="removeFromCart";
            removeButton.appendChild(document.createTextNode("Remove from Cart"));

            const buyItem = document.createElement("button");
            buyItem.className="buyItem";
            buyItem.appendChild(document.createTextNode("Buy this item"));

            const contactSeller = document.createElement("button");
            contactSeller.className="contactSeller";
            contactSeller.appendChild(document.createTextNode("Contact the seller"));

            postDiv.appendChild(removeButton);
            postDiv.appendChild(buyItem);
            postDiv.appendChild(contactSeller);

            document.querySelector("#posts").appendChild(postDiv);
        }
        const endOfResults = document.createElement("div");
        endOfResults.id = "endOfResults";
        endOfResults.appendChild(document.createTextNode("End of Results"));
        document.querySelector("#posts").appendChild(endOfResults);
    }
}

const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searching);

function searching(e) {
    e.preventDefault();
    //Server call to request search result, here just jump to the item.html;
    document.location = "../pages/items.html";
}


/*********************** Chat Box ************************/

const chat = document.querySelector('#chat');
const sendButton = document.querySelector("#sendButton");
sendButton.addEventListener('click', sendMessage);

function sendMessage(e) {
    e.preventDefault();

    if (e.target.classList.contains("submit")) {
        const message = document.querySelector("#messageBox").value;
        if (message.length > 0 && message.length < 200) {
            addMessage(message);
        }
    }
    chat.scrollTop = chat.scrollHeight;
}


// helper function for sendMessage, add message to chat window
function addMessage(msg) {
    const newMessage = document.createElement('p');
    newMessage.className = "chatOutText";
    newMessage.innerText = msg;
    const bubble = document.createElement('div');
    bubble.className = "chatOutBubble";
    bubble.appendChild(newMessage);
    const messageContainer = document.createElement('div');
    messageContainer.appendChild(bubble);
    chat.appendChild(messageContainer);
}

/*********************** Contact Seller by User "user" for Phase 1 ************************/

// Show / Hide chatbox
const chatShow = document.querySelector("#chatShow");
const chatHide = document.querySelector("#chatHide");
chatHide.addEventListener('click', hideChatRoom);
chatShow.addEventListener('click', showChatRoom);

function showChatRoom(e) {
    e.preventDefault();
    const chatRoom = document.querySelector('#chatRoom');
    chatRoom.style.display = "block";
}

function hideChatRoom(e) {
    e.preventDefault();
    const chatRoom = document.querySelector('#chatRoom');
    chatRoom.style.display = "none";
}

const contactButton = document.querySelectorAll('.contactSeller');

// as explained in phase1.txt, we are showing how the button should behave from "user1 user1"'s post for phase 1
contactButton[1].addEventListener("click", contactTheSeller);

function contactTheSeller(e) {
    showChatRoom(e);
}

const buyItemButtons = document.querySelectorAll(".buyItem");
for (let i = 0; i < buyItemButtons.length;i++) {
    buyItemButtons[i].addEventListener("click", buyItem);
}
function buyItem(e) {
    //Server call to update the shopping cart of user
    // Here just use user0
    const postId = parseInt(e.target.parentElement.querySelector(".postIdNumber").innerHTML);
    //Should make a server call to fetch the post, here just use the hardcoded posts array
    const post = posts.filter(x => x.postId === postId)[0];
    console.log(post);
    if (!post.byCreditCard) {
        alert("The seller want you to pay him/her directly, please contact the seller!");
    } else {
        // jump to the credit card page
        document.location = "./payment.html";
        //Make a server call to submit the credit card Number and the postId!
    }



}

