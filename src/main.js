const create_post_form = document.getElementById('create_post_form');
const msg = document.querySelector('.msg');
const post_list = document.querySelector('.user-post-list');

// Show posts --->
const showLetestPost = () => {
    const posts =getDataLS('posts');

    let content ="";

    if(posts.length > 0){
      
        posts.reverse().map((item, index) => {
            
            content += ` <!------- Post Header ------>
            <div class="post-header">
                <div class="author">
                    <div class="author-profile-img">
                    <img src=" ${item.author_photo}" alt="">
                    </div>
                    <div class="post-author-name">
                        <a href="#">${item.author_name}</a>
                        <span><i class="fas fa-circle"></i>${timeAgo(item.post_time)}</span>
                        <a href="#"></a>
                        <p>Rosario, Argentina</p>
                    </div>
                </div>
                <div class="three-dot">
                    <a href="#"><i class="fas fa-ellipsis-h"></i></a>
                </div>
            </div>

            <!------ Post Body ------>
            <div class="post-body">
                <div class="post-img">
                ${item.post_photo ?  `<img src="${item.post_photo}"alt="" />` : ""}
                </div>
                <div class="post-reaction">
                    <div class="p-reaction-left">
                        <div class="post-like post-icon">
                            <span><i class="far fa-heart"></i></span>
                        </div>
                        <div class="post-comment post-icon">
                            <span><i class="far fa-comment"></i></span>
                        </div>
                        <div class="post-share post-icon">
                            <span><i class="far fa-paper-plane"></i></span>
                        </div>
                    </div>
                    <div class="post-save post-icon">
                        <span><i class="far fa-bookmark"></i></span>
                    </div>
                </div>
                <div class="post-like-total">
                    <p> 20,028,910 likes</p>
                </div>
                <div class="post-content">
                    <p> ${item.post_content ? item.post_content : ""}</p>
                </div>
                <div class="write-comment">
                    <p>View all 176k comments</p>
                    <form action="#">
                        <input type="text" name="" id="" placeholder="Add a comment…">
                    </form>
                    <span><i class="far fa-smile"></i></span>
                </div>
            </div>   `
        })

    }else{

        content = " <h2>No Posts Found</h2>";

    }

    post_list.innerHTML =content;
};

showLetestPost();

// Form Submit
create_post_form.onsubmit = (e) => {
   e.preventDefault();
   
// Get Form Data--->
 
const form_data = new FormData(e.target);
const data = Object.fromEntries(form_data.entries());


if(!data.author_name || !data.author_photo){

    msg.innerHTML = createAlert("author name and photo is required");

} else{
    // Get PrevData

const prevData = getDataLS("posts");
prevData.push({
    author_name:data.author_name,
    author_photo:data.author_photo,
    post_content:data.post_content ?? null,
    post_photo:data.post_photo ?? null,
    post_time:Date.now(),   

});  

// Send Data to Databaseee ---->
sendDataLS('posts' , prevData);
showLetestPost();


e.target.reset();

}

};

