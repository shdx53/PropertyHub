<template>
    <!-- <Navbar></Navbar> -->
    <div class="container">
         <div class="d-flex justify-content-center my-5">
            <button type="button" class="btn btn-outline-primary createbtn" data-bs-toggle="modal" data-bs-target="#CreateListingModal">+ Create Listing</button>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
            <div class="card" data-bs-toggle="modal" data-bs-target="#ListingModal">
                <img src="..\assets\img\HomeView\Listings\tobi-Z72YrutFDak-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eaque ad voluptatum dolorum itaque, quia repudiandae tenetur molestiae cum repellendus cupiditate quisquam. Ex iusto obcaecati, dolor vel nisi nihil? At!</p>
                </div>
            </div>
            </div>
            <div class="col">
            <div class="card" data-bs-toggle="modal" data-bs-target="#ListingModal">
                <img src="..\assets\img\HomeView\Listings\tobi-Z72YrutFDak-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut in dolor autem esse? Doloribus molestiae corporis nobis ab, sint deleniti dolores error ratione rem quo qui quas earum reprehenderit illum!</p>
                </div>
            </div>
            </div>
            <div class="col">
            <div class="card" data-bs-toggle="modal" data-bs-target="#ListingModal">
                <img src="..\assets\img\HomeView\Listings\tobi-Z72YrutFDak-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque reiciendis ducimus odio beatae veritatis maxime distinctio, adipisci quo iusto eos est soluta non voluptate, aliquam vel atque aliquid eligendi deserunt.</p>
                </div>
            </div>
            </div>
            <div class="col">
            <div class="card" data-bs-toggle="modal" data-bs-target="#ListingModal">
                <img src="..\assets\img\HomeView\Listings\tobi-Z72YrutFDak-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consectetur aperiam incidunt. Saepe molestiae tempora praesentium necessitatibus, illum velit! Magnam itaque, alias illo deserunt rerum aliquam voluptatum natus laudantium blanditiis!</p>
                </div>
            </div>
            </div>
        </div>

        <!-- Create Listing Modal -->
        <!-- <div class="modal fade" id="CreateListingModal" tabindex="-1" aria-labelledby="CreateListingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="ModalLabel">Create Listing</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                <div class="mb-3">
                    <label for="address" class="col-form-label">Address:</label>
                    <input type="text" class="form-control" id="address">
                </div>
                
                <div class="mb-3">
                    <label for="insertphoto" class="col-form-label">Insert Photo:</label>
                    <input type="file" name="image" accept="image/png, image/jpeg" multiple id="insertphoto"/>

                </div>
                <div class="mb-3">
                    <label for="leasecommence" class="col-form-label">Lease commencement year:</label>
                    <input type="text" class="form-control" id="leasecommence">
                </div>
                <div class="mb-3">
                    <label for="listedprice" class="col-form-label">Listed price:</label>
                    <input type="text" class="form-control" id="listedprice">
                </div>
                <div class="mb-3">
                    <label for="floorsize" class="col-form-label">Floor size:</label>
                    <input type="text" class="form-control" id="floorsize">
                </div>
                </form>
        
            </div>
            <div class="modal-footer">
            
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Create Listing</button>
            </div>
            </div>
        </div>
        </div> -->





        <!--Listing Modal -->
        <div class="modal fade" id="ListingModal" tabindex="-1" aria-labelledby="ListingModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="ModalLabel">House address</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnclose"></button>
            </div>
            <div class="modal-body">
                <form>
                <div class="mb-3">
                    <label for="address" class="col-form-label">Address:</label>
                    <input type="text" class="form-control" id="address" disabled>
                </div>
                
                <div class="mb-3">
                    <label for="insertphoto" class="col-form-label">Insert Photo:</label>
                    <input type="file" name="image" accept="image/png, image/jpeg" multiple id="insertphoto" disabled/>

                </div>
                <div class="mb-3">
                    <label for="leasecommence" class="col-form-label">Lease commencement year:</label>
                    <input type="text" class="form-control" id="leasecommence" disabled>
                </div>
                <div class="mb-3">
                    <label for="listedprice" class="col-form-label">Listed price:</label>
                    <input type="text" class="form-control" id="listedprice" disabled>
                </div>
                <div class="mb-3">
                    <label for="floorsize" class="col-form-label">Floor size:</label>
                    <input type="text" class="form-control" id="floorsize" disabled>
                </div>
                </form>
        
            </div>
            <div class="modal-footer">
                
                <button @click="toggleStates" type="button" class="btn btn-primary" id="editButton">Edit</button>
                <button @click="toggleStates" type="button" class="btn btn-primary" id="saveButton" data-bs-dismiss="modal" hidden>Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    <!-- <Footer></Footer> -->
</template>

<style scoped>
.container{
    width:80%;
    margin:auto;
}
.card{
    margin: 5%;
    cursor: pointer;
    box-shadow: 6px 6px 27px 0px rgba(0,0,0,0.44);
}
.card:hover{
  box-shadow: 6px 6px 27px 14px rgba(0,0,0,0.31);
}
.card-title{
  font-weight: 700;
}

.createbtn:hover{
  box-shadow: 6px 6px 27px 0px rgba(0,0,0,0.44);

}
input[type="text"]:disabled {
color: inherit; 
background-color: transparent; 
border: 0px solid #ccc;
cursor: text; 
}
</style>

<script setup>
    const toggleStates = () => {
        saveButton.hidden = !saveButton.hidden;
        editButton.hidden = !editButton.hidden;
        // Loop through all input fields and toggle their disabled state
        var inputFields = document.querySelectorAll('input');        
        inputFields.forEach(function(input) {
            input.disabled = !input.disabled;
        });
};

</script>
