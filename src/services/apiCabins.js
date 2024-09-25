import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("cabins could not be loaded");
    }
    return cabins;
}

export async function deleteCabin(id) {
    // console.log(id);
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("cabins could not be deleted");
    }
    // console.log(error);
}

export async function createEditCabin(newCabin, id) {
    // console.log(newCabin, id);
    // const hasImagePath = newCabin.image?.startwith?.(supabase);
    const hasImagePath = typeof newCabin.image === "string";
    // console.log(hasImagePath);
    const imageName = hasImagePath ? "" : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    //https://rablfpsysffatewbyzxa.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // console.log(imagePath);
    //1. create cabin
    let query = supabase.from("cabins");
    if (!id) {
        query = query.insert([
            {
                name: newCabin.name,
                max_capacity: newCabin.maxCapacity,
                regular_price: newCabin.regularPrice,
                discount: newCabin.discount,
                description: newCabin.description,
                image: imagePath,
            },
        ]);
    } else {
        query = query
            .update({
                name: newCabin.name,
                max_capacity: newCabin.maxCapacity,
                regular_price: newCabin.regularPrice,
                discount: newCabin.discount,
                description: newCabin.description,
                image: imagePath,
            })
            .eq("id", id)
            .select();
    }

    const { data, error } = await query.select();
    if (error) {
        // console.error(error);
        throw new Error("cabins could not be added");
    }
    // console.log(error);
    // console.log(data);

    if (!hasImagePath) {
        //2. upload image
        const { data: storageData, error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, newCabin.image);
        console.log(storageData);
        //3. delete the cabin if there was an error uploading image
        if (storageError) {
            const { error } = await supabase.from("cabins").delete().eq("id", data.id);
            console.error(error);
            throw new Error("cabin image could not be uploaded and the cabin was not created");
        }
    }
    return data;
}
