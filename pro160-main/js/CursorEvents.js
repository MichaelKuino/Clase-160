AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
    /**alumno */
    this.handleClickEvents();
  },

  handleClickEvents:function(){
    /**alumno */
    //Eventos"click del cursor"
    this.el.addEventListener("click", evt => {
      const placesContainer = document.querySelector("#places-container");
      const {state} = placesContainer.getAttribute("tour")
    
      if (state==="places-list"){
        const id=this.el.getAttribute("id");
        const placesId=[
          "taj-mahal",
          "budapest",
          "new-york-city",
          "eiffel-tower"
        ];
        
        if(placesId.includes(id)){
          placesContainer.setAttribute("tour",{
            state:"view",
            selectedCard:id
        });
      }
    }


    if (state==="view"){
      this.handleViewState();
    }
    if (state ==="change-view"){
      this.handleViewState();
    }
     })

  },
/******/
/****160 */
handleViewState:function(){
  const el =this.el;
  const id=el.getAttribute("id");
  const placesContainer=document.querySelector("places-container");
  const {selectedItemId}=placesContainer.getAttribute("cursor-listener");
  const sideViewPlacesId=["place-1","place-2", "place-3", "place8-4"];

  if(sideViewPlacesId.includes(id)){
    placesContainer.setAttribute("tour", {
      state: "change-view"
    });
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src : `./assets/360_images/${selectedItemId}/${id}.jpg`,
      color: "#FFF"
    })
  }
        
  
},
/********************************** */

  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      });
    }
  },
  handleMouseEnterEvents: function () {
    // Evento 'mouseenter' del cursor.
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
      const placeContainer = document.querySelector("#places-container");
      const { state } = placeContainer.getAttribute("tour");
       if (state === "places-list") {
        this.handlePlacesListState();
      }
    });
  
  },
  handleMouseLeaveEvents: function () {
    // Evento 'mouseleave' del cursor.
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data;
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`);
        const id = el.getAttribute("id");
        if (id == selectedItemId) {
          el.setAttribute("material", {
            color: "#0077CC",
            opacity: 1,
          });
        }
      }
    
    });
  },
});
