import React from 'react';
import useSafeTheme from '../../hooks/useSafeTheme';

const PremiumLoading = ({
    message = "Initializing Core Terminal...",
    subtext = "Preparing your workspace",
    fullScreen = true
}) => {
    const { isDarkMode } = useSafeTheme();

    const containerClasses = fullScreen
        ? `min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`
        : `w-full h-[60vh] flex flex-col items-center justify-center relative rounded-[3rem] overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-slate-900/40 backdrop-blur-3xl border border-white/5' : 'bg-white/70 backdrop-blur-3xl border border-slate-200'} mt-10`;

    return (
        <div className={containerClasses}>

            {/* Dynamic Background Elements - Only for fullScreen */}
            {fullScreen && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 dark:bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

                    {/* Animated Grid lines */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                        style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>
                </div>
            )}

            <div className={`relative z-10 flex flex-col items-center ${fullScreen ? 'gap-8' : 'gap-6'}`}>
                {/* Animated Logo Container */}
                <div className="relative group">
                    {fullScreen && (
                        <>
                            {/* Outer Rotating Ring */}
                            <div className="absolute -inset-6 rounded-full border-2 border-dashed border-blue-600/20 animate-[spin_10s_linear_infinite]"></div>
                            {/* Inner Pulsing Glow */}
                            <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 animate-pulse"></div>
                        </>
                    )}

                    {/* Central Logo Box */}
                    <div className={`relative ${fullScreen ? 'w-24 h-24' : 'w-16 h-16'} rounded-3xl bg-gradient-to-br from-white to-slate-100 p-1 shadow-2xl border border-white/20 transform animate-[bounce_3s_ease-in-out_infinite] overflow-hidden`}>
                        <img
                            src="/logo.jpeg"
                            alt="BlueHeaven Logo"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>

                    {fullScreen && (
                        /* Orbiting Dot */
                        <div className="absolute -inset-4 animate-[spin_3s_linear_infinite]">
                            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                        </div>
                    )}
                </div>

                {/* Text Interface */}
                <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <h2 className={`${fullScreen ? 'text-[12px]' : 'text-[10px]'} font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.5em] mb-1 animate-pulse`}>
                        {message}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className={`h-[1px] ${fullScreen ? 'w-8' : 'w-4'} bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-700`}></div>
                        <p className={`${fullScreen ? 'text-[10px]' : 'text-[9px]'} font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest`}>
                            {subtext}
                        </p>
                        <div className={`h-[1px] ${fullScreen ? 'w-8' : 'w-4'} bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-700`}></div>
                    </div>
                </div>

                {/* Modern Progress Bar */}
                <div className={`${fullScreen ? 'w-48' : 'w-32'} h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 w-full animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
            </div>
            <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
      `}</style>
        </div>
    );
};

export default PremiumLoading;
