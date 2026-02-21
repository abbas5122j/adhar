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
import { cn } from '@/lib/utils';

// Generate random CAPTCHA code
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const CenterAuth = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Center form
  const [centerId, setCenterId] = useState('');
  const [password, setPassword] = useState('');

  // CAPTCHA
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/home', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async () => {
    setError('');

    // Validate center ID
    if (centerId.length < 3) {
      setError('Please enter a valid Center ID');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Validate CAPTCHA
    if (captchaInput.toUpperCase() !== captchaCode) {
      setError('Incorrect CAPTCHA. Please try again.');
      setCaptchaInput('');
      setCaptchaCode(generateCaptcha());
      return;
    }

    setLoading(true);
    try {
      // For center login
      const ok = await login(centerId, password);
      if (ok) {
        navigate('/home', { replace: true });
      } else {
        setError('Invalid Center ID or password');
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
    <div className="min-h-screen flex bg-gradient-to-br from-[hsl(140,60%,35%)] via-[hsl(140,60%,35%)] to-[hsl(140,60%,35%)]/80 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pattern-grid opacity-5" />
      <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
      <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary-foreground/5 blur-3xl" />

      {/* Language selector */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      {/* Left branding (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative z-10">
        <div className="max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Aadhaar Seva</h1>
              <p className="text-sm text-primary-foreground/60">Service Center Portal</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Service Center Access
          </h2>
          <p className="text-lg text-primary-foreground/70">Manage bookings and serve citizens</p>

          {/* Tricolor strip */}
          <div className="flex gap-1 mt-8">
            <div className="h-1.5 w-16 rounded-full bg-[hsl(24,96%,53%)]" />
            <div className="h-1.5 w-16 rounded-full bg-primary-foreground/80" />
            <div className="h-1.5 w-16 rounded-full bg-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardContent className="p-6 sm:p-8">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[hsl(140,60%,35%)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Aadhaar Seva</h1>
                <p className="text-xs text-muted-foreground">Service Center Portal</p>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Service Center Login</h2>
              <p className="text-sm text-muted-foreground">Enter your credentials to access the center dashboard</p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="space-y-4"
            >
              {/* Center ID */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Center ID
                </label>
                <Input 
                  type="text" 
                  placeholder="Enter your Center ID" 
                  value={centerId}
                  onChange={(e) => setCenterId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Enter your service center ID</p>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <CaptchaInput
                value={captchaInput}
                onChange={setCaptchaInput}
                captchaCode={captchaCode}
                onRefresh={handleCaptchaRefresh}
                isLoading={loading}
              />

              <Button
                className="w-full bg-[hsl(140,60%,35%)] hover:bg-[hsl(140,60%,35%)]/90"
                size="lg"
                onClick={handleSubmit}
                disabled={loading || !centerId || !password || !captchaInput}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                Center Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive text-center mt-4">
                {error}
              </motion.p>
            )}

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <button
                  className="text-primary font-medium hover:underline"
                  onClick={() => navigate('/')}
                >
                  Back to Login Selection
                </button>
              </p>
            </div>

            {/* Tricolor */}
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

export default CenterAuth;
