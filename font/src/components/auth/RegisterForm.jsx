"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import GitHub from "@mui/icons-material/GitHub"
import Google from "@mui/icons-material/Google"
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useDispatch, useSelector } from "react-redux"
import { getUser, register, logout } from "../../State/Auth/Action"
import { useNavigate } from "react-router-dom"

function RegisterForm({ handleClose }) {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const { auth } = useSelector(store => store)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt])

  useEffect(() => {
    if(auth.jwt) {
      handleClose()
    }
  }, [auth.jwt, handleClose])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleCloseMenu()
  }

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Error state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }


  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Validate full name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      const { confirmPassword, ...userData } = formData;
      dispatch(register(userData))

      setTimeout(() => {
        setIsSubmitting(false)
      }, 100)
    }
  }

  // Handle social sign-ups
  const handleGoogleSignUp = () => {
    console.log("Google sign-up clicked - redirecting to Google OAuth2 endpoint");
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  const handleGitHubSignUp = () => {
    console.log("GitHub sign-up clicked")
    // Implement GitHub sign-up logic
  }

  const handleSignInClick = (e) => {
    e.preventDefault();
    handleClose();
    navigate('/sign-in');
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
          Create an Account
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Sign up to get started with our service
        </Typography>

        {/* Social Sign-up Buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <div className="flex w-full flex-col space-y-4">
            <div className="border shadow-md rounded-md border-gray-300">
              <Button variant="" fullWidth startIcon={<Google />} onClick={handleGoogleSignUp} sx={{ py: 1 }}>
                Google
              </Button>
            </div>

            <div className="border shadow-md rounded-md border-gray-300">
              <Button variant="" fullWidth startIcon={<GitHub />} onClick={handleGitHubSignUp} sx={{ py: 1 }}>
                GitHub
              </Button>
            </div>
          </div>
        </Stack>

        {/* Divider */}
        <Box sx={{ position: "relative", my: 3 }}>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "background.paper",
              px: 1,
              color: "text.secondary",
            }}
          >
            OR
          </Typography>
        </Box>

        {/* Sign-up Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* Full Name Field */}
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              placeholder="John"
            />

            {/* last name */}
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              placeholder="Doe"
            />

            {/* Email Field */}
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="you@example.com"
            />

            {/* Password Field */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ py: 1.5, mt: 1 }}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
          </Stack>
        </form>

        {/* Sign In Link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Box component="span">
            Already have an account?{" "}
            <Button onClick={handleSignInClick} className="text-primary font-bold">
              Sign In Now
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}
RegisterForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default RegisterForm