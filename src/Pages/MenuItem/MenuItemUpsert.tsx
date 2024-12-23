import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../apis/menuItemApi";
import { useNavigate, useParams } from "react-router-dom";
import MainLoader from "../../Components/Page/Common/MainLoader";
const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
};
function MenuItemUpsert() {
  const { id } = useParams();
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [imageToBeDisplay, setImageToBeDisplay] = useState<string>("");
  const [imageToBeStore, setImageToBeStore] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const { data } = useGetMenuItemByIdQuery(id);
  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setMenuItemInputs(tempData);
      setImageToBeDisplay(data.result.image);
    }
  }, [data]);

  const navigate = useNavigate();
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImageTypes = ["jpeg", "png", "jpg"];
      const isImgValid = validImageTypes.includes(imgType);
      if (file.size > 1000 * 1024) {
        setImageToBeStore("");
        toastNotify("File size should be less than 1MB", "error");
        return;
      }
      if (!isImgValid) {
        setImageToBeStore("");
        toastNotify("File must be in jpeg,jpg or png", "error");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStore(file);
      reader.onload = (e) => {
        const ImgUrl = e.target?.result as string;
        setImageToBeDisplay(ImgUrl);
      };
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToBeStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag);
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);
    if (imageToBeDisplay) formData.append("Image", imageToBeStore);

    let response;
    if (id) {
      // update
      formData.append("Id", id);
      response = await updateMenuItem({ data: formData, id: id });
      toastNotify("Menu Item updated Successfully", "success");
    } else {
      // create
      response = await createMenuItem(formData);
      toastNotify("Menu Item created Successfully", "success");
    }
    if (response) {
      setLoading(false);
      navigate("/menuItem/menuItemList");
    }

    setLoading(false);
  };
  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">{id ? "Edit" : "Add"} Menu Item</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
              required
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="row">
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-md-6">
                <a
                  onClick={() => navigate("/menuItem/menuItemList")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back To Menu Items
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToBeDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
