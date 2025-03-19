import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../State/Auth/Action';

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Lấy token từ query parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      console.log('OAuthRedirect - Token found:', token);
      // Lưu token vào localStorage
      localStorage.setItem('jwt', token);
      console.log('OAuthRedirect - Token saved to localStorage');
      
      // Hiển thị token đã được lưu trong localStorage
      const savedToken = localStorage.getItem('jwt');
      console.log('OAuthRedirect - Verified token in localStorage:', savedToken === token);
      
      try {
        // Lấy thông tin người dùng từ token
        console.log('OAuthRedirect - Dispatching getUser action with token');
        dispatch(getUser(token));
      } catch (error) {
        console.error('OAuthRedirect - Error dispatching getUser:', error);
        setError('Lỗi khi dispatch getUser: ' + error.message);
        setIsProcessing(false);
      }
    } else {
      console.error('OAuthRedirect - No token found in URL');
      setError('Không tìm thấy token xác thực. Vui lòng thử đăng nhập lại.');
      setIsProcessing(false);
    }
  }, [location, dispatch]);

  // Theo dõi trạng thái auth để xử lý chuyển hướng
  useEffect(() => {
    if (!isProcessing) return;

    if (auth.error) {
      console.error('OAuthRedirect - Auth error:', auth.error);
      setError('Lỗi xác thực: ' + auth.error);
      setIsProcessing(false);
    }

    if (auth.user) {
      console.log('OAuthRedirect - User loaded, redirecting to home');
      // Chuyển hướng đến trang chủ
      setTimeout(() => {
        navigate('/');
        setIsProcessing(false);
      }, 1000);
    }
  }, [auth, navigate, isProcessing]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button 
          onClick={() => navigate('/sign-in')} 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Quay lại đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
      <p className="text-lg">Đang xử lý đăng nhập...</p>
      {auth.isLoading && <p className="text-sm text-gray-500 mt-2">Đang lấy thông tin người dùng...</p>}
    </div>
  );
};

export default OAuthRedirect; 