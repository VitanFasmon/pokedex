import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";

interface PokemonInfoProps {
  pokemonUrl: string;
}

const CustomizePokemon = ({ pokemonUrl }: PokemonInfoProps) => {
  const [customName, setCustomName] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const getDataFromLocalStorage = () => {
    const storedPokemonData = localStorage.getItem(pokemonUrl);

    if (storedPokemonData) {
      const { name, description, image } = JSON.parse(storedPokemonData);

      setCustomName(name);
      setCustomDescription(description);
      setImageURL(image);
    } else {
      setCustomName("");
      setCustomDescription("");
      setImageURL(null);
    }
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, [pokemonUrl]);

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!customName || customName.length > 50 || !nameRegex.test(customName)) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Name must be letters only and up to 50 characters.",
      });
      return false;
    }
    if (!customDescription || customDescription.length > 300) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Description must be up to 300 characters.",
      });
      return false;
    }
    if (!imageURL) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please upload an image.",
      });
      return false;
    }
    return true;
  };

  const savePokemonData = () => {
    if (!validateForm()) return;

    const pokemonData = {
      name: customName,
      description: customDescription,
      image: imageURL,
    };

    localStorage.setItem(pokemonUrl, JSON.stringify(pokemonData));

    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Pokemon data saved!",
    });
  };

  const onImageUpload = async (event: any) => {
    const IMGBB_API_KEY = "c9106f318de39953cab786e1deb1cab9";
    const API_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

    const file = event.files[0];
    if (!file) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please select an image to upload.",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setImageURL(result.data.url);
        toast.current?.show({
          severity: "info",
          summary: "Success",
          detail: "Image uploaded!",
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Image upload failed.",
        });
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Image upload failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-start items-start gap-2 px-4">
      <h2 className="text-orange-950 text-2xl">Customize the POKEMON</h2>
      <div className="flex justify-between flex-wrap w-full">
        <div className="flex md:w-1/2 gap-2 flex-col">
          {imageURL && imageURL !== "" && (
            <img
              src={imageURL || ""}
              alt="your custom pokemon image"
              className="object-scale-down h-96"
            />
          )}
        </div>

        <form
          className="flex flex-col pl-4 md:w-1/2 gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <InputText
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Your custom name of the Pokemon"
            aria-label="Enter custom Pokemon name"
            className="placeholder-orange-800 p-2 bg-orange-100 border border-orange-950 rounded text-orange-950"
            required
            maxLength={50}
          />
          <InputTextarea
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            rows={5}
            cols={30}
            placeholder="Your custom description of the Pokemon"
            aria-label="Enter custom Pokemon description"
            className="placeholder-orange-800 p-2 bg-orange-100 border border-orange-950 rounded text-orange-950"
            required
            maxLength={300}
          />

          <div className="flex justify-between items-center mt-4">
            <div className="card flex justify-content-center gap-2">
              <Toast ref={toast}></Toast>

              <FileUpload
                mode="basic"
                name="demo[]"
                accept="image/png, image/jpg, image/jpeg, image/svg+xml"
                maxFileSize={1000000}
                onSelect={(e) => {
                  setSelectedFile(e.files[0]);
                  onImageUpload(e);
                }}
                auto
              />
            </div>
            <Button label="Save" className="mt-4" onClick={savePokemonData} />
          </div>

          {loading && (
            <div className="flex justify-center mt-4">
              <ProgressSpinner />
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default CustomizePokemon;
