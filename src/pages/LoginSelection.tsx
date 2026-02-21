import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  User, 
  Building2, 
  Users, 
  ArrowRight, 
  Lock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSelector } from '@/components/language/LanguageSelector';

// Login type options
const loginOptions = [
  {
    id: 'user',
    title: 'User Login',
    description: 'For Aadhaar card holders to book appointments, track applications, and manage updates',
    icon: User,
    href: '/auth',
    color: 'bg-primary',
    borderColor: 'border-primary/20 hover:border-primary/40',
  },
  {
    id: 'admin',
    title: 'Admin Login',
    description: 'For UIDAI administrators to manage users, view analytics, and oversee operations',
    icon: Building2,
    href: '/admin',
    color: 'bg-[hsl(24,96%,53%)]', // Saffron
    borderColor: 'border-[hsl(24,96%,53%)]/20 hover:border-[hsl(24,96%,53%)]/40',
  },
  {
    id: 'center',
    title: 'Service Center Login',
    description: 'For enrollment center operators to manage bookings and serve citizens',
    icon: Users,
    href: '/center',
    color: 'bg-[hsl(140,60%,35%)]', // Green
    borderColor: 'border-[hsl(140,60%,35%)]/20 hover:border-[hsl(140,60%,35%)]/40',
  },
];

const LoginSelection = () => {
  const navigate = useNavigate();

  const handleLoginClick = (href: string) => {
    navigate(href);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary via-primary to-primary/80 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pattern-grid opacity-5" />
      <motion.div 
        animate={{ y: [-10, 10, -10] }} 
        transition={{ duration: 6, repeat: Infinity }} 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" 
      />
      <motion.div 
        animate={{ y: [10, -10, 10] }} 
        transition={{ duration: 8, repeat: Infinity }} 
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary-foreground/5 blur-3xl" 
      />
      
      {/* Tricolor decorations */}
      <motion.div 
        animate={{ x: [-5, 5, -5] }} 
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-32 rounded-r-full bg-[hsl(24,96%,53%)]/30" 
      />
      <motion.div 
        animate={{ x: [5, -5, 5] }} 
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-32 rounded-l-full bg-[hsl(140,60%,35%)]/30" 
      />

      {/* Language selector */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10">
        {/* Logo and title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-2">
            Aadhaar Seva
          </h1>
          <p className="text-lg text-primary-foreground/70">
            Secure Update Platform
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-primary-foreground/80 mb-8 max-w-md"
        >
          Select your login type to continue
        </motion.p>

        {/* Login options cards - Horizontal layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl"
        >
          {loginOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex-1"
              >
                <Card 
                  className={`
                    cursor-pointer transition-all duration-300 border-2 bg-card/95 backdrop-blur
                    hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1
                    ${option.borderColor}
                  `}
                  onClick={() => handleLoginClick(option.href)}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-2xl ${option.color} flex items-center justify-center mb-4
                      shadow-lg
                    `}>
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {option.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {option.description}
                    </p>
                    
                    {/* Button */}
                    <Button 
                      variant="outline" 
                      className="w-full group border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Login
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Help text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-primary-foreground/60 mt-8 text-sm"
        >
          Having trouble logging in? Contact your system administrator
        </motion.p>

        {/* Tricolor strip */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex gap-1 mt-8"
        >
          <div className="h-1.5 w-16 rounded-full bg-[hsl(24,96%,53%)]" />
          <div className="h-1.5 w-16 rounded-full bg-primary-foreground/80" />
          <div className="h-1.5 w-16 rounded-full bg-[hsl(140,60%,35%)]" />
        </motion.div>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-primary-foreground/40 mt-4 text-xs"
        >
          © 2024 UIDAI. All rights reserved. | Secure Connection
        </motion.p>
      </div>
    </div>
  );
};

export default LoginSelection;
