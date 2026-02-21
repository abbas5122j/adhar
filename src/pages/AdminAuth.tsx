import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Loader2,
  Eye, EyeOff, ArrowRight, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CaptchaInput } from '@/components/auth/CaptchaInput';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSelector } from '@/components/language/LanguageSelector';

// Generate random CAPTCHA code
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const AdminAuth = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Admin form
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  // CAPTCHA
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/admin-panel', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async () => {
    setError('');

    if (adminId.length < 3) {
      setError('Please enter a valid Admin ID');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (captchaInput.toUpperCase() !== captchaCode) {
      setError('Incorrect CAPTCHA. Please try again.');
      setCaptchaInput('');
      setCaptchaCode(generateCaptcha());
      return;
    }

    setLoading(true);
    try {
      const ok = await login(adminId, password);
      if (ok) {
        navigate('/admin-panel', { replace: true });
      } else {
        setError('Invalid Admin ID or password');
      }
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  const handleCaptchaRefresh = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput('');
    setError('');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[hsl(24,96%,53%)] via-[hsl(24,96%,53%)] to-[hsl(24,96%,53%)]/80 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-5" />
      <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
      <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary-foreground/5 blur-3xl" />

      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative z-10">
        <div className="max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Aadhaar Seva</h1>
              <p className="text-sm text-primary-foreground/60">Admin Portal</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">Admin Dashboard Access</h2>
          <p className="text-lg text-primary-foreground/70">Manage users, view analytics, and oversee operations</p>
          <div className="flex gap-1 mt-8">
            <div className="h-1.5 w-16 rounded-full bg-primary-foreground" />
            <div className="h-1.5 w-16 rounded-full bg-primary-foreground/80" />
            <div className="h-1.5 w-16 rounded-full bg-[hsl(140,60%,35%)]" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardContent className="p-6 sm:p-8">
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[hsl(24,96%,53%)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Aadhaar Seva</h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Admin Login</h2>
              <p className="text-sm text-muted-foreground">Enter your credentials to access the admin dashboard</p>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Admin ID</label>
                <Input type="text" placeholder="Enter your Admin ID" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
                <p className="text-xs text-muted-foreground mt-1">Enter your administrator ID</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <CaptchaInput value={captchaInput} onChange={setCaptchaInput} captchaCode={captchaCode} onRefresh={handleCaptchaRefresh} isLoading={loading} />

              <Button className="w-full bg-[hsl(24,96%,53%)] hover:bg-[hsl(24,96%,53%)]/90" size="lg" onClick={handleSubmit} disabled={loading || !adminId || !password || !captchaInput}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                Admin Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive text-center mt-4">{error}</motion.p>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <button className="text-primary font-medium hover:underline" onClick={() => navigate('/')}>Back to Login Selection</button>
              </p>
            </div>

            <div className="flex gap-1 justify-center mt-6">
              <div className="h-1 w-10 rounded-full bg-[hsl(24,96%,53%)]" />
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
              <div className="h-1 w-10 rounded-full bg-[hsl(140,60%,35%)]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
