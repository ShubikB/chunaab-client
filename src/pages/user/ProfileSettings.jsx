import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAction } from '@features/user/userAction';
import useForm from '@hooks/useForm';
import Loader from '@components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '@components/others/GoBackButton';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  const formInitialValue = {
    fullName: '',
    email: '',
    bio: '',
    profileImage: null,
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { form, setFormValues, handleOnSubmit, handleOnChange } =
    useForm(formInitialValue);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) {
      setFormValues({
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || '',
        profileImage: user.profileImage || '',
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File must be less than 2MB');
        return;
      }
      setSelectedFile(file);
      handleOnChange({
        target: { name: 'profileImage', value: URL.createObjectURL(file) },
      });
    }
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('fullName', form.fullName);
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }
      formData.append('bio', form.bio);

      setLoading(true);

      await dispatch(updateProfileAction(formData));
      navigate('/user/profile');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Container className="my-5 text-center">
      <Loader text="Updating your profile" />
    </Container>
  ) : (
    <Container className="my-5 px-3">
      <GoBackButton />
      <Card className="p-4 shadow-sm rounded-4">
        <h3 className="mb-4" style={{ fontSize: '1.75rem' }}>
          Profile Settings
        </h3>
        <Form onSubmit={(e) => handleOnSubmit(e, onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleOnChange}
              style={{ fontSize: '1rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleOnChange}
              readOnly
              disabled
              style={{
                fontSize: '1rem',
                border: '1px solid red',
                backgroundColor: '#f8d7da',
                color: '#721c24',
              }}
            />
            <Form.Text className="text-danger">
              Email is read-only and cannot be updated.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleOnChange}
              style={{ fontSize: '1rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            {form.profileImage && (
              <div
                className="mb-3"
                style={{ maxWidth: '100%', overflow: 'hidden' }}
              >
                <img
                  src={form.profileImage}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ width: '250px', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            )}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Form.Text className="text-muted">Max size: 2MB</Form.Text>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ProfileSettings;
