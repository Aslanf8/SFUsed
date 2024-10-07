// // Import necessary modules
// import React, { useState } from "react";
// import { TextField, Button, Box, Typography, Alert, MenuItem } from "@mui/material";
// import { useAuth } from '../lib/authContext';
// import { supabase } from '../lib/supabaseClient';  // Ensure that your supabase client supports storage

// // Existing logic
// export function getErrorMessage(error: unknown): string {
//   if (error instanceof Error) return error.message;
//   return String(error);
// }

// interface CreateListingProps {
//   onListingCreated: () => void;
// }

// const conditions = [
//   "New",
//   "Like New",
//   "Very Good",
//   "Good",
//   "Acceptable",
// ];

// const CreateListing: React.FC<CreateListingProps> = ({ onListingCreated }) => {
//   const { user } = useAuth();

//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [edition, setEdition] = useState("");
//   const [condition, setCondition] = useState("");
//   const [price, setPrice] = useState("");
//   const [courseNumber, setCourseNumber] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState<File | null>(null); // State for image
//   const [error, setError] = useState("");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!user) {
//       setError("You must be logged in to create a listing");
//       return;
//     }

//     try {
//       let imageUrl = "";

//       // Upload the image if one is selected
//       if (image) {
//         const { data, error: uploadError } = await supabase.storage
//           .from('listings-images') // Ensure this bucket exists in your Supabase storage
//           .upload(`public/${user.id}/${image.name}`, image);

//         if (uploadError) throw uploadError;
//         imageUrl = `${supabase.storage.from('listings-images').getPublicUrl(`public/${user.id}/${image.name}`).data.publicUrl}`;
//       }

//       // Insert the listing into the database
//       const { error: insertError } = await supabase
//         .from('listings')
//         .insert({
//           user_id: user.id,
//           title,
//           author,
//           edition,
//           condition,
//           price: parseFloat(price),
//           course_number: courseNumber,
//           description,
//           image_url: imageUrl, // Store image URL in the listing
//         });

//       if (insertError) throw insertError;

//       onListingCreated();
//       // Reset form fields
//       setTitle("");
//       setAuthor("");
//       setEdition("");
//       setCondition("");
//       setPrice("");
//       setCourseNumber("");
//       setDescription("");
//       setImage(null); // Reset image
//     } catch (err) {
//       setError(getErrorMessage(err));
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="title"
//         label="Book Title"
//         name="title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="author"
//         label="Author"
//         name="author"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//       />
//       <TextField
//         margin="normal"
//         fullWidth
//         id="edition"
//         label="Edition"
//         name="edition"
//         value={edition}
//         onChange={(e) => setEdition(e.target.value)}
//       />
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="condition"
//         select
//         label="Condition"
//         name="condition"
//         value={condition}
//         onChange={(e) => setCondition(e.target.value)}
//       >
//         {conditions.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="price"
//         label="Price"
//         name="price"
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         InputProps={{
//           startAdornment: <Typography>$</Typography>,
//         }}
//       />
//       <TextField
//         margin="normal"
//         fullWidth
//         id="courseNumber"
//         label="Course Number"
//         name="courseNumber"
//         value={courseNumber}
//         onChange={(e) => setCourseNumber(e.target.value)}
//       />
//       <TextField
//         margin="normal"
//         fullWidth
//         id="description"
//         label="Description"
//         name="description"
//         multiline
//         rows={4}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       {/* Image upload field */}
//       <input
//         accept="image/*"
//         type="file"
//         onChange={handleImageChange}
//         style={{ marginTop: '16px' }}
//       />

//       <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//         Create Listing
//       </Button>
//     </Box>
//   );
// };

// export default CreateListing;

// components/CreateListing.tsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert, MenuItem } from "@mui/material";
import { useAuth } from '../lib/authContext';
import { supabase } from '../lib/supabaseClient';



export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

interface CreateListingProps {
  onListingCreated: () => void;
}


const conditions = [
  "New",
  "Like New",
  "Very Good",
  "Good",
  "Acceptable",
];

const CreateListing: React.FC<CreateListingProps> = ({ onListingCreated }) => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to create a listing");
      return;
    }

    try {
      const {  error } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          title,
          author,
          edition,
          condition,
          price: parseFloat(price),
          course_number: courseNumber,
          description,
        });

      if (error) throw error;

      onListingCreated();
      // Reset form fields
      setTitle("");
      setAuthor("");
      setEdition("");
      setCondition("");
      setPrice("");
      setCourseNumber("");
      setDescription("");
    } catch (err) {
      // setError(err.message);
      setError(getErrorMessage(err));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Book Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="author"
        label="Author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="edition"
        label="Edition"
        name="edition"
        value={edition}
        onChange={(e) => setEdition(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="condition"
        select
        label="Condition"
        name="condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        {conditions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        margin="normal"
        required
        fullWidth
        id="price"
        label="Price"
        name="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        InputProps={{
          startAdornment: <Typography>$</Typography>,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        id="courseNumber"
        label="Course Number"
        name="courseNumber"
        value={courseNumber}
        onChange={(e) => setCourseNumber(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="description"
        label="Description"
        name="description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create Listing
      </Button>
    </Box>
  );
};

export default CreateListing;