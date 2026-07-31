'use client';
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth, formatFirebaseAuthError } from '@/context/AuthContext';

// ─── Tech orbit icons ─────────────────────────────────────────────
const ICONS = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', alt: 'Next.js', r: 110, speed: 18, startAngle: 0 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', alt: 'React', r: 110, speed: 18, startAngle: 180 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', alt: 'TypeScript', r: 170, speed: 24, startAngle: 60 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', alt: 'Firebase', r: 170, speed: 24, startAngle: 240 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind', r: 230, speed: 30, startAngle: 90 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', alt: 'Figma', r: 230, speed: 30, startAngle: 270 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', alt: 'Git', r: 290, speed: 36, startAngle: 120 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', alt: 'HTML5', r: 290, speed: 36, startAngle: 300 },
];

// ─── Animated Orbit Canvas ─────────────────────────────────────────
function OrbitCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angles, setAngles] = useState(ICONS.map(ic => ic.startAngle));

  useEffect(() => {
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setAngles(prev => prev.map((a, i) => (a + (360 / ICONS[i].speed) * dt) % 360));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Orbit rings */}
      {[110, 170, 230, 290].map(r => (
        <div key={r} style={{
          position: 'absolute',
          width: r * 2,
          height: r * 2,
          borderRadius: '50%',
          border: '1px solid rgba(99,102,241,0.15)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Center text */}
      <div style={{ position: 'absolute', textAlign: 'center', zIndex: 1 }}>
        <div style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          fontFamily: "'Space Grotesk', sans-serif",
          background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.04em',
        }}>
          Firebase
        </div>
        <div style={{
          fontSize: '1rem',
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          background: 'linear-gradient(135deg, #a5b4fc 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em',
        }}>
          Auth
        </div>
      </div>

      {/* Icons */}
      {ICONS.map((icon, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const x = Math.cos(rad) * icon.r;
        const y = Math.sin(rad) * icon.r;
        const size = icon.r > 200 ? 36 : 30;
        return (
          <div
            key={icon.alt}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              width: size,
              height: size,
              borderRadius: '8px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(99,102,241,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'transform 0.016s linear',
            }}
          >
            <Image src={icon.src} alt={icon.alt} width={size - 8} height={size - 8} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Input Field ───────────────────────────────────────────────────
function AuthInput({
  label, type = 'text', placeholder, value, onChange, required,
}: {
  label: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword ? (showPass ? 'text' : 'password') : type;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#8b9ec7', letterSpacing: '0.01em' }}>
        {label} {required && <span style={{ color: '#6366f1' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            height: '46px',
            padding: isPassword ? '0 44px 0 16px' : '0 16px',
            borderRadius: '10px',
            border: `1px solid ${focused ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.1)'}`,
            background: focused ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.04)',
            color: '#f1f5f9',
            fontSize: '0.93rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
            boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: '#4b5680', cursor: 'pointer',
              display: 'flex', alignItems: 'center', padding: 0,
            }}
          >
            {showPass ? <Eye size={17} /> : <EyeOff size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Login Page ───────────────────────────────────────────────
export default function LoginPage() {
  const { user, isAdmin, signInWithGoogle, signInWithEmail, signUpWithEmail, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' });
  const [busy, setBusy] = useState(false);

  // If already logged in, redirect to /profile
  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setBusy(true);
    setStatus({ type: null, msg: '' });
    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      setStatus({ type: 'success', msg: '🔥 Redirecting to Profile Dashboard...' });
      setTimeout(() => router.push('/profile'), 600);
    } catch (err: any) {
      const errorMsg = formatFirebaseAuthError(err);
      setStatus({ type: 'error', msg: errorMsg });
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    setStatus({ type: null, msg: '' });
    try {
      const googleUser = await signInWithGoogle();
      if (googleUser) {
        setStatus({ type: 'success', msg: `🌐 Redirecting to Profile...` });
        setTimeout(() => router.push('/profile'), 600);
      }
    } catch (err: any) {
      const errorMsg = err?.message || err?.code || 'Google popup error';
      if (errorMsg.includes('configuration-not-found') || errorMsg.includes('auth/configuration-not-found')) {
        setStatus({
          type: 'error',
          msg: `⚠️ Google Provider is disabled in Firebase Console! Fix in 10 seconds:\n1. Open console.firebase.google.com → Project 'quikcode-c8c00'\n2. Click Authentication → Sign-in method\n3. Click "Google" → Toggle Enable & select Support Email → Click Save!`,
        });
      } else {
        setStatus({ type: 'error', msg: `Firebase Google Auth Error: ${errorMsg}` });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Global styles for this page */}
      <style>{`
        @keyframes loginFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loginPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .login-anim { animation: loginFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .login-anim-1 { animation-delay: 0.05s; }
        .login-anim-2 { animation-delay: 0.1s; }
        .login-anim-3 { animation-delay: 0.15s; }
        .login-anim-4 { animation-delay: 0.2s; }
        .login-anim-5 { animation-delay: 0.25s; }
        .google-btn:hover { background: rgba(255,255,255,0.09) !important; border-color: rgba(255,255,255,0.2) !important; }
        .submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.45) !important; }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn { transition: all 0.2s ease; }
        .google-btn { transition: all 0.2s ease; }
        .mode-link:hover { color: #818cf8; }
      `}</style>

      <main style={{
        height: '100dvh',
        display: 'flex',
        overflow: 'hidden',
        background: '#05070d',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {/* ── LEFT PANEL — Orbit Display ── */}
        <div style={{
          width: '50%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)',
        }} className="max-lg:hidden">
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

          <div style={{ width: '100%', height: '100%', maxWidth: 640, maxHeight: 640, position: 'relative' }}>
            <OrbitCanvas />
          </div>

          <div style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 9999,
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            whiteSpace: 'nowrap',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'loginPulse 2s ease infinite' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6ee7b7', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>
              FIREBASE AUTHENTICATED
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL — Auth Form ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          overflowY: 'auto',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: '30%', right: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

          <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
            <div className="login-anim login-anim-1" style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, textDecoration: 'none' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, color: '#fff', fontSize: '0.95rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '-0.04em',
                  boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                }}>QC</div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.04em', color: '#f1f5f9' }}>
                  Quick<span style={{ color: '#6366f1' }}>Code</span>
                </span>
              </Link>

              <h1 style={{
                fontSize: '1.9rem', fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.04em', color: '#f1f5f9', lineHeight: 1.1,
              }}>
                {mode === 'signin' ? 'Welcome back' : 'Create account'}
              </h1>
              <p style={{ fontSize: '0.88rem', color: '#4b5680', marginTop: 4 }}>
                {mode === 'signin'
                  ? 'Sign in to manage your projects & invoices'
                  : 'Join QuickCode and start building today'}
              </p>
            </div>

            {/* Signed-in state */}
            {user && (
              <div className="login-anim login-anim-1" style={{
                padding: '16px 20px',
                borderRadius: 12,
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="avatar" width={32} height={32} style={{ borderRadius: '50%', border: '2px solid rgba(16,185,129,0.4)', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6ee7b7' }}>{user.displayName || user.email}</div>
                    <div style={{ fontSize: '0.75rem', color: '#4b5680' }}>Firebase Auth Active</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href="/profile" style={{ padding: '5px 12px', borderRadius: 7, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
                    Profile →
                  </Link>
                  <button
                    onClick={logout}
                    style={{
                      padding: '5px 12px', borderRadius: 7,
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#fca5a5', fontSize: '0.8rem',
                      fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}

            {/* Status alert */}
            {status.type && (
              <div style={{
                padding: '11px 16px',
                borderRadius: 10,
                marginBottom: 20,
                background: status.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${status.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                color: status.type === 'success' ? '#6ee7b7' : '#fca5a5',
                fontSize: '0.87rem',
                fontWeight: 500,
                whiteSpace: 'pre-line',
              }}>
                {status.msg}
              </div>
            )}

            {/* Google Sign In */}
            <div className="login-anim login-anim-2">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="google-btn"
                style={{
                  width: '100%', height: 46,
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem',
                  cursor: busy ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  opacity: busy ? 0.6 : 1,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="login-anim login-anim-3" style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <span style={{ fontSize: '0.75rem', color: '#2d3660', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="login-anim login-anim-3">
                <AuthInput
                  label="Email address"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </div>

              <div className="login-anim login-anim-4">
                <AuthInput
                  label="Password"
                  type="password"
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Enter your password'}
                  value={password}
                  onChange={setPassword}
                  required
                />
              </div>

              <div className="login-anim login-anim-5">
                <button
                  type="submit"
                  disabled={busy}
                  className="submit-btn"
                  style={{
                    width: '100%', height: 46,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    border: 'none',
                    cursor: busy ? 'not-allowed' : 'pointer',
                    opacity: busy ? 0.7 : 1,
                    boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '-0.01em',
                  }}
                >
                  {busy ? (
                    <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Authenticating...</>
                  ) : (
                    mode === 'signin' ? 'Sign in →' : 'Create account →'
                  )}
                </button>
              </div>
            </form>

            {/* Mode toggle */}
            <div className="login-anim login-anim-5" style={{ textAlign: 'center', marginTop: 20 }}>
              <span style={{ fontSize: '0.85rem', color: '#4b5680' }}>
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                type="button"
                onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setStatus({ type: null, msg: '' }); }}
                className="mode-link"
                style={{
                  background: 'none', border: 'none',
                  color: '#6366f1', fontSize: '0.85rem',
                  fontWeight: 700, cursor: 'pointer',
                  textDecoration: 'none', transition: 'color 0.2s',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </div>

            {/* Back to home & Admin link if Admin */}
            <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', gap: 20 }}>
              <Link href="/" style={{ fontSize: '0.82rem', color: '#2d3660', textDecoration: 'none', transition: 'color 0.2s' }}>
                ← Back to QuickCode
              </Link>
              {user && isAdmin && (
                <>
                  <span style={{ color: '#2d3660' }}>•</span>
                  <Link href="/admin" style={{ fontSize: '0.82rem', color: '#6366f1', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
                    🛡️ Admin Portal →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .max-lg\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}
