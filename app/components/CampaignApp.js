'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, Users, MapPin, MessageSquare, BarChart3, FileText, CheckCircle, Clock, AlertTriangle, Plus, Search, Filter, Bell, Menu, X, ChevronRight, Phone, Mail, Video, Download, Send, ArrowLeft, Edit, Trash2, Star, Lock, Eye, EyeOff, Shield, UserCheck, Settings, LogOut, Mic, Camera, Share, Home, Bookmark, RefreshCw } from 'lucide-react';

const CampaignApp = () => {
  // Estados principales
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [pullToRefresh, setPullToRefresh] = useState(false);
  
  // Referencias para funcionalidades móviles
  const chatEndRef = useRef(null);
  
  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Cargar datos del usuario desde sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = sessionStorage.getItem('campaignUser');
      const savedTareas = sessionStorage.getItem('campaignTareas');
      const savedMessages = sessionStorage.getItem('campaignMessages');
      const savedNotifications = sessionStorage.getItem('campaignNotifications');
      
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      if (savedTareas) {
        setTareas(JSON.parse(savedTareas));
      }
      if (savedMessages) {
        setChatMessages(JSON.parse(savedMessages));
      }
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
    }
  }, []);

  // Usuarios predefinidos
  const users = [
    { 
      id: 1, 
      email: 'jefa@pnl.cl', 
      password: 'jefa2025', 
      name: 'Jefa Campaña', 
      role: 'jefa-campana',
      avatar: 'JC',
      phone: '+56912345678'
    },
    { 
      id: 2, 
      email: 'comunicaciones@pnl.cl', 
      password: 'comm2025', 
      name: 'Comunicaciones', 
      role: 'comunicaciones',
      avatar: 'CO',
      phone: '+56912345679'
    },
    { 
      id: 3, 
      email: 'movilizacion@pnl.cl', 
      password: 'movil2025', 
      name: 'Movilización', 
      role: 'movilizacion',
      avatar: 'MO',
      phone: '+56912345680'
    },
    { 
      id: 4, 
      email: 'presidente@pnl.cl', 
      password: 'pres2025', 
      name: 'Presidente', 
      role: 'presidente',
      avatar: 'PR',
      phone: '+56912345681'
    },
    { 
      id: 5, 
      email: 'tesorero@pnl.cl', 
      password: 'tesoro2025', 
      name: 'Tesorero', 
      role: 'tesorero',
      avatar: 'TE',
      phone: '+56912345682'
    }
  ];

  const roleColors = {
    'jefa-campana': 'from-red-500 to-red-600',
    'comunicaciones': 'from-blue-500 to-blue-600',
    'movilizacion': 'from-green-500 to-green-600',
    'presidente': 'from-yellow-500 to-yellow-600',
    'tesorero': 'from-teal-500 to-teal-600'
  };

  // Datos
  const comunas = [
    'Rancagua', 'Graneros', 'Mostazal', 'Codegua', 'Machalí', 'Olivar', 'Requínoa', 'Rengo', 'Malloa', 'Quinta de Tilcoco',
    'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'San Vicente',
    'Santa Cruz', 'Pichidegua', 'Peumo', 'Las Cabras', 'Coinco', 'Coltauco', 'Doñihue', 'Lo Miranda', 'Quinta Normal', 'San Francisco de Mostazal',
    'Pichilemu', 'La Estrella', 'Litueche'
  ];

  const planCampana = [
    { dia: 1, fecha: '15 Ago', titulo: 'Lanzamiento y Estrategia Rápida', estado: 'completado', progress: 100 },
    { dia: 2, fecha: '16 Ago', titulo: 'Contacto Directo Inicial y Afiliación', estado: 'activo', progress: 75 },
    { dia: 3, fecha: '17 Ago', titulo: 'Propuestas: Educación y Conectividad', estado: 'pendiente', progress: 0 },
    { dia: 4, fecha: '18 Ago', titulo: 'Refuerzo Ideológico y Valores del PNL', estado: 'pendiente', progress: 0 },
    { dia: 5, fecha: '19 Ago', titulo: 'Propuestas: Seguridad y Medio Ambiente', estado: 'pendiente', progress: 0 },
    { dia: 6, fecha: '20 Ago', titulo: 'Articulación Territorial y Liderazgo', estado: 'pendiente', progress: 0 },
    { dia: 7, fecha: '21 Ago', titulo: 'Amplificación y Medios Locales', estado: 'pendiente', progress: 0 },
    { dia: 8, fecha: '22 Ago', titulo: 'Movilización Final y Evento de Cierre', estado: 'pendiente', progress: 0 },
    { dia: 9, fecha: '23-24 Ago', titulo: 'Día de la Elección', estado: 'pendiente', progress: 0 }
  ];

  const [tareas, setTareas] = useState([
    { 
      id: Date.now() - 6, 
      titulo: 'Llamadas a afiliados Rancagua', 
      equipo: 'movilizacion', 
      comuna: 'Rancagua', 
      prioridad: 'alta', 
      estado: 'en-progreso', 
      fecha: new Date().toISOString().split('T')[0], 
      completado: false,
      createdAt: new Date(),
      asignado: 'Movilización'
    },
    { 
      id: Date.now() - 5, 
      titulo: 'Contenido redes sociales - Educación', 
      equipo: 'comunicaciones', 
      comuna: 'Regional', 
      prioridad: 'alta', 
      estado: 'pendiente', 
      fecha: new Date().toISOString().split('T')[0], 
      completado: false,
      createdAt: new Date(),
      asignado: 'Comunicaciones'
    },
    { 
      id: Date.now() - 4, 
      titulo: 'Revisión propuestas campaña', 
      equipo: 'jefa-campana', 
      comuna: 'Regional', 
      prioridad: 'media', 
      estado: 'completado', 
      fecha: new Date().toISOString().split('T')[0], 
      completado: true,
      createdAt: new Date(),
      asignado: 'Jefa Campaña'
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      user: 'Comunicaciones', 
      team: 'comunicaciones', 
      message: '¿Ya tenemos el contenido para educación listo?', 
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), 
      avatar: 'CO',
      timestamp: new Date()
    },
    { 
      id: 2, 
      user: 'Movilización', 
      team: 'movilizacion', 
      message: 'Coordinando llamadas para esta tarde', 
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), 
      avatar: 'MO',
      timestamp: new Date()
    }
  ]);

  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'Nueva tarea asignada', 
      time: 'Hace 5 min', 
      type: 'info', 
      read: false,
      timestamp: new Date()
    },
    { 
      id: 2, 
      title: 'Reunión en 30 minutos', 
      time: 'Hace 15 min', 
      type: 'warning', 
      read: false,
      timestamp: new Date()
    }
  ]);

  // Funciones de persistencia
  const saveToStorage = useCallback((key, data) => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.warn('No se pudo guardar en sessionStorage:', error);
      }
    }
  }, []);

  // Funciones principales
  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setLoginError('');
      saveToStorage('campaignUser', user);
      
      // Vibración de éxito en móviles
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(200);
      }
    } else {
      setLoginError('Credenciales incorrectas');
      // Vibración de error
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 100, 100]);
      }
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
    setLoginData({ email: '', password: '' });
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('campaignUser');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && currentUser) {
      const message = {
        id: Date.now(),
        user: currentUser.name,
        team: currentUser.role,
        message: newMessage,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        avatar: currentUser.avatar,
        timestamp: new Date()
      };
      
      const updatedMessages = [...chatMessages, message];
      setChatMessages(updatedMessages);
      saveToStorage('campaignMessages', updatedMessages);
      setNewMessage('');
      
      // Scroll al final del chat
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
      // Vibración de envío
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  const toggleTareaCompleta = (id) => {
    const updatedTareas = tareas.map(tarea => 
      tarea.id === id 
        ? { 
            ...tarea, 
            completado: !tarea.completado, 
            estado: tarea.completado ? 'pendiente' : 'completado',
            updatedAt: new Date()
          }
        : tarea
    );
    setTareas(updatedTareas);
    saveToStorage('campaignTareas', updatedTareas);
    
    // Vibración de confirmación
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const addNewTarea = (titulo, prioridad = 'media', comuna = 'Regional') => {
    const newTarea = {
      id: Date.now(),
      titulo,
      equipo: currentUser.role,
      comuna,
      prioridad,
      estado: 'pendiente',
      fecha: new Date().toISOString().split('T')[0],
      completado: false,
      createdAt: new Date(),
      asignado: currentUser.name
    };
    
    const updatedTareas = [...tareas, newTarea];
    setTareas(updatedTareas);
    saveToStorage('campaignTareas', updatedTareas);
  };

  // Funciones móviles específicas
const handleShare = async (content) => {
  if (typeof window !== 'undefined') {
    // Vibración
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    // Probar Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Campaña PNL O\'Higgins',
          text: content,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback: copiar al portapapeles
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(`${content} - ${window.location.href}`);
          alert('¡Enlace copiado! Ahora puedes pegarlo donde quieras.');
        } else {
          alert(`Comparte este enlace: ${window.location.href}`);
        }
      }
    } else {
      // Fallback para navegadores sin Web Share
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${content} - ${window.location.href}`);
        alert('¡Enlace copiado! Ahora puedes pegarlo donde quieras.');
      } else {
        alert(`Comparte este enlace: ${window.location.href}`);
      }
    }
  }
};
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Campaña PNL O\'Higgins',
          text: content,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback para navegadores sin Web Share API
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(content);
        alert('Copiado al portapapeles');
      }
    }
  };

  const handleCall = (phoneNumber) => {
  if (typeof window !== 'undefined') {
    // Vibración primero
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    // Mostrar confirmación
    if (confirm(`¿Llamar a ${phoneNumber}?`)) {
      window.location.href = `tel:${phoneNumber}`;
    }
  }
};

const handleEmail = (email) => {
  if (typeof window !== 'undefined') {
    // Vibración
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    // Confirmar antes de abrir email
    if (confirm(`¿Enviar email a ${email}?`)) {
      window.location.href = `mailto:${email}?subject=Campaña PNL O'Higgins&body=Hola, escribo desde la app de campaña...`;
    }
  }
};
  const refreshData = async () => {
    setIsLoading(true);
    // Simular actualización de datos
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSync(new Date());
    setIsLoading(false);
    
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  // Pantalla de Login
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-blue-600 font-bold text-2xl">PNL</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Campaña O'Higgins</h1>
          <p className="text-blue-100">Directivas Regionales 2025</p>
          
          <div className={`inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs ${
            isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-white' : 'bg-white'}`}></div>
            {isOnline ? 'En línea' : 'Sin conexión'}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600 text-sm">Ingresa con tu cuenta autorizada</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{loginError}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="tu.email@pnl.cl"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-base"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-6 hover:bg-blue-700 transition-colors disabled:opacity-50 text-base"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Iniciando...
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">Cuentas disponibles:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <button 
                onClick={() => setLoginData({email: 'jefa@pnl.cl', password: 'jefa2025'})}
                className="block w-full text-left hover:text-blue-600"
              >
                <strong>Jefa Campaña:</strong> jefa@pnl.cl / jefa2025
              </button>
              <button 
                onClick={() => setLoginData({email: 'comunicaciones@pnl.cl', password: 'comm2025'})}
                className="block w-full text-left hover:text-blue-600"
              >
                <strong>Comunicaciones:</strong> comunicaciones@pnl.cl / comm2025
              </button>
              <button 
                onClick={() => setLoginData({email: 'presidente@pnl.cl', password: 'pres2025'})}
                className="block w-full text-left hover:text-blue-600"
              >
                <strong>Presidente:</strong> presidente@pnl.cl / pres2025
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente Dashboard simplificado
  const Dashboard = () => (
    <div className="space-y-4">
      <div className={`bg-gradient-to-r ${roleColors[currentUser?.role]} p-4 rounded-lg text-white`}>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">{currentUser?.avatar}</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">¡Hola, {currentUser?.name}!</h2>
            <p className="text-sm opacity-90">Tienes {tareas.filter(t => !t.completado).length} tareas pendientes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Tareas Pendientes</p>
              <p className="text-2xl font-bold">{tareas.filter(t => !t.completado).length}</p>
            </div>
            <CheckCircle className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Completadas</p>
              <p className="text-2xl font-bold">{tareas.filter(t => t.completado).length}</p>
            </div>
            <Star className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Comunas Activas</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <MapPin className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Días Restantes</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <Clock className="h-8 w-8 opacity-80" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-bold mb-3">Sistema Funcionando</h2>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Autenticación activa
          </div>
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Datos guardándose automáticamente
          </div>
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Optimizado para móvil
          </div>
          <div className="flex items-center text-sm text-blue-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Listo para Vercel
          </div>
        </div>
      </div>
    </div>
  );

  // Navegación mobile
  const navigation = [
    { id: 'dashboard', name: 'Inicio', icon: Home },
    { id: 'tareas', name: 'Tareas', icon: CheckCircle },
    { id: 'territorial', name: 'Territorial', icon: MapPin },
    { id: 'comunicaciones', name: 'Chat', icon: MessageSquare },
    { id: 'recursos', name: 'Recursos', icon: FileText },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">PNL</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Campaña O'Higgins</h1>
                <p className="text-xs text-gray-600">{currentUser?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}>
                  <Bell className="h-6 w-6 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </div>
              <button onClick={handleLogout} className="p-1 text-gray-600 hover:text-red-600 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
              <div className={`w-8 h-8 bg-gradient-to-br ${roleColors[currentUser?.role]} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{currentUser?.avatar}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 pb-20">
        <Dashboard />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-5">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-2 transition-colors ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className="text-xs font-medium">{item.name}</span>
              {activeTab === item.id && (
                <div className="w-4 h-0.5 bg-blue-600 rounded-full mt-1"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CampaignApp;
