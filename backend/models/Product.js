import API from "../services/api";

const formData = new FormData();
formData.append("name", name);
formData.append("price", price);
formData.append("category", category);
formData.append("description", description);
formData.append("image", image);

await API.post("/products", formData);
