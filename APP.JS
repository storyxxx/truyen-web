const list = document.getElementById("list");

function render(data){
  list.innerHTML = "";
  data.forEach(s => {
    list.innerHTML += `
      <div class="card">
        <h3><a href="${s.link}">${s.title}</a></h3>
        <p>${s.tag.join(", ")}</p>
      </div>
    `;
  });
}

render(stories);

// FILTER
function filter(tag){
  if(tag === "all") return render(stories);
  let res = stories.filter(s => s.tag.includes(tag));
  render(res);
}

// SEARCH
document.getElementById("search").addEventListener("input", e=>{
  let v = e.target.value.toLowerCase();
  let res = stories.filter(s => s.title.toLowerCase().includes(v));
  render(res);
});

// DARK MODE
function toggleDark(){
  document.body.classList.toggle("dark");
}