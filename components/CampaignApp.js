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
  const [showAddTarea, setShowAddTarea] = useState(false);
  const [newTareaTitle, setNewTareaTitle] = useState('');
  
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
    },
    { 
      id: Date.now() - 3, 
      titulo: 'Coordinación evento San Fernando', 
      equipo: 'movilizacion', 
      comuna: 'San Fernando', 
      prioridad: 'alta', 
      estado: 'pendiente', 
      fecha: new Date().toISOString().split('T')[0], 
      completado: false,
      createdAt: new Date(),
      asignado: 'Movilización'
    },
    { 
      id: Date.now() - 2, 
      titulo: 'Aprobación presupuesto campaña', 
      equipo: 'tesorero', 
      comuna: 'Regional', 
      prioridad: 'alta', 
      estado: 'pendiente', 
      fecha: new Date().toISOString().split('T')[0], 
      completado: false,
      createdAt: new Date(),
      asignado: 'Tesorero'
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
    },
    { 
      id: 3, 
      user: 'Jefa Campaña', 
      team: 'jefa-campana', 
      message: 'Perfecto equipo! Vamos bien con el cronograma', 
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), 
      avatar: 'JC',
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
    if (!titulo.trim()) return;
    
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
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleEmail = (email) => {
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${email}`;
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

  // Componente Dashboard completo
  const Dashboard = () => (
    <div className="space-y-4">
      {/* Pull to refresh indicator */}
      {pullToRefresh && (
        <div className="flex justify-center py-2">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
        </div>
      )}
      
      {/* Estado de conexión y última sync */}
      <div className="flex items-center justify-between text-xs text-gray-600 px-2">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          {isOnline ? 'En línea' : 'Sin conexión'}
        </div>
        <div>
          Última sync: {lastSync.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Saludo personalizado */}
      <div className={`bg-gradient-to-r ${roleColors[currentUser?.role]} p-4 rounded-lg text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">{currentUser?.avatar}</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">¡Hola, {currentUser?.name}!</h2>
              <p className="text-sm opacity-90">Tienes {tareas.filter(t => !t.completado).length} tareas pendientes</p>
            </div>
          </div>
          <button 
            onClick={refreshData}
            className="p-2 bg-white bg-opacity-20 rounded-full"
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPIs mejorados */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Tareas Pendientes</p>
              <p className="text-2xl font-bold">{tareas.filter(t => !t.completado).length}</p>
              <p className="text-xs opacity-75">de {tareas.length} total</p>
            </div>
            <CheckCircle className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Completadas</p>
              <p className="text-2xl font-bold">{tareas.filter(t => t.completado).length}</p>
              <p className="text-xs opacity-75">+{tareas.filter(t => t.completado).length} hoy</p>
            </div>
            <Star className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Comunas Activas</p>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs opacity-75">de 33 total</p>
            </div>
            <MapPin className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Días Restantes</p>
              <p className="text-2xl font-bold">7</p>
              <p className="text-xs opacity-75">hasta elección</p>
            </div>
            <Clock className="h-8 w-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Plan de Campaña con progreso */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-bold mb-3 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          Plan de Campaña - 9 Días
        </h2>
        <div className="space-y-2">
          {planCampana.slice(0, 4).map((dia) => (
            <div key={dia.dia} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                dia.estado === 'completado' ? 'bg-green-500' : 
                dia.estado === 'activo' ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                {dia.estado === 'completado' ? '✓' : dia.dia}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{dia.titulo}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-600">{dia.fecha}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          dia.estado === 'completado' ? 'bg-green-500' : 
                          dia.estado === 'activo' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        style={{ width: `${dia.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{dia.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => alert(`Plan completo de ${planCampana.length} días:\n${planCampana.map(d => `${d.dia}. ${d.titulo}`).join('\n')}`)}
            className="w-full text-center text-blue-500 text-sm font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Ver plan completo ({planCampana.length} días)
          </button>
        </div>
      </div>

      {/* Tareas recientes mejoradas */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Tareas Recientes
          </h2>
          <button 
            onClick={() => setActiveTab('tareas')}
            className="text-blue-500 text-sm font-medium"
          >
            Ver todas
          </button>
        </div>
        <div className="space-y-2">
          {tareas.slice(0, 3).map(tarea => (
            <div key={tarea.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <button 
                onClick={() => toggleTareaCompleta(tarea.id)}
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                  tarea.completado ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {tarea.completado && <CheckCircle className="h-3 w-3 text-white" />}
              </button>
              <div className="flex-1">
                <p className={`font-medium text-sm ${tarea.completado ? 'line-through text-gray-500' : ''}`}>
                  {tarea.titulo}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-600">{tarea.asignado} • {tarea.comuna}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    tarea.prioridad === 'alta' ? 'bg-red-100 text-red-800' :
                    tarea.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {tarea.prioridad}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => setActiveTab('comunicaciones')}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <MessageSquare className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-sm font-medium">Chat</span>
          {chatMessages.length > 0 && (
            <span className="text-xs text-gray-500">{chatMessages.length} mensajes</span>
          )}
        </button>
        <button 
          onClick={() => handleCall('+56912345678')}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Phone className="h-8 w-8 text-green-500 mb-2" />
          <span className="text-sm font-medium">Llamar</span>
          <span className="text-xs text-gray-500">Emergencia</span>
        </button>
        <button 
          onClick={() => handleShare('Únete a la campaña PNL O\'Higgins 2025')}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Share className="h-8 w-8 text-purple-500 mb-2" />
          <span className="text-sm font-medium">Compartir</span>
          <span className="text-xs text-gray-500">Campaña</span>
        </button>
      </div>
    </div>
  );

  // Componente Tareas completo
  const Tareas = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Tareas ({tareas.length})</h2>
        <button 
          onClick={() => setShowAddTarea(true)}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Modal para añadir tarea */}
      {showAddTarea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 transform transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Nueva Tarea</h3>
              <button 
                onClick={() => setShowAddTarea(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newTareaTitle}
                onChange={(e) => setNewTareaTitle(e.target.value)}
                placeholder="Describe la tarea..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setShowAddTarea(false);
                    setNewTareaTitle('');
                  }}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (newTareaTitle.trim()) {
                      addNewTarea(newTareaTitle);
                      setNewTareaTitle('');
                      setShowAddTarea(false);
                      
                      if (typeof window !== 'undefined' && navigator.vibrate) {
                        navigator.vibrate(200);
                      }
                    }
                  }}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  Crear Tarea
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de tareas */}
      <div className="space-y-3">
        {tareas.map(tarea => (
          <div key={tarea.id} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <button 
                    onClick={() => toggleTareaCompleta(tarea.id)}
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      tarea.completado ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {tarea.completado && <CheckCircle className="h-4 w-4 text-white" />}
                  </button>
                  <h3 className={`font-medium text-sm flex-1 ${tarea.completado ? 'line-through text-gray-500' : ''}`}>
                    {tarea.titulo}
                  </h3>
                </div>
                <div className="ml-9 space-y-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <Users className="h-3 w-3 mr-1" />
                    {tarea.asignado}
                    <MapPin className="h-3 w-3 ml-3 mr-1" />
                    {tarea.comuna}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tarea.prioridad === 'alta' ? 'bg-red-100 text-red-800' :
                      tarea.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(tarea.fecha).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tareas.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas</h3>
          <p className="text-gray-600">Crea tu primera tarea usando el botón +</p>
        </div>
      )}
    </div>
  );

  // Componente Territorial
  const Territorial = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Territorial</h2>
        <button 
          onClick={refreshData}
          className="p-2 bg-gray-100 rounded-full"
          disabled={isLoading}
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {/* Resumen por zonas con progreso */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-green-700">Zona Norte</h3>
            <span className="text-xs text-gray-500">75% completado</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Rancagua, Graneros, Mostazal</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-green-600">8 actividades</span>
            <div className="w-20 bg-green-100 rounded-full h-2">
              <div className="w-3/4 bg-green-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-blue-700">Zona Centro</h3>
            <span className="text-xs text-gray-500">50% completado</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">San Fernando, Santa Cruz</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-600">5 actividades</span>
            <div className="w-20 bg-blue-100 rounded-full h-2">
              <div className="w-1/2 bg-blue-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-yellow-700">Zona Costa</h3>
            <span className="text-xs text-gray-500">25% completado</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Pichilemu, La Estrella</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-yellow-600">3 actividades</span>
            <div className="w-20 bg-yellow-100 rounded-full h-2">
              <div className="w-1/4 bg-yellow-500 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa de comunas mejorado */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Comunas ({comunas.length})</h3>
          <span className="text-xs text-gray-500">Toca para detalles</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {comunas.slice(0, 12).map((comuna, index) => (
            <button
              key={comuna}
              onClick={() => alert(`Comuna: ${comuna}\nEstado: ${
                index % 4 === 0 ? 'Activa - 3 tareas pendientes' :
                index % 4 === 1 ? 'En progreso - 2 tareas activas' :
                index % 4 === 2 ? 'Programada - 1 evento próximo' : 'Sin actividad registrada'
              }\nPoblación: ${Math.floor(Math.random() * 50000 + 10000)} habitantes`)}
              className="border rounded-lg p-2 text-center hover:bg-gray-50 transition-colors"
            >
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                index % 4 === 0 ? 'bg-green-500' :
                index % 4 === 1 ? 'bg-blue-500' :
                index % 4 === 2 ? 'bg-yellow-500' : 'bg-gray-300'
              }`}></div>
              <span className="text-xs font-medium">{comuna}</span>
              <div className="text-xs text-gray-500 mt-1">
                {index % 4 === 0 ? '✓ Activa' :
                 index % 4 === 1 ? '⏳ Progreso' :
                 index % 4 === 2 ? '📅 Programada' : '○ Inactiva'}
              </div>
            </button>
          ))}
        </div>
        <button 
          onClick={() => alert(`Todas las comunas (${comunas.length}):\n${comunas.join(', ')}`)}
          className="w-full text-center text-blue-500 text-sm font-medium py-2 mt-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Ver todas las comunas ({comunas.length})
        </button>
      </div>
    </div>
  );

  // Componente Chat mejorado
  const Comunicaciones = () => (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Chat del Equipo</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleCall('+56912345678')}
            className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <Phone className="h-4 w-4 text-green-600" />
          </button>
          <button 
            onClick={() => handleEmail('equipo@pnl.cl')}
            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Mail className="h-4 w-4 text-blue-600" />
          </button>
          <button 
            onClick={() => handleShare('Únete al chat del equipo PNL')}
            className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
          >
            <Share className="h-4 w-4 text-purple-600" />
          </button>
        </div>
      </div>

      {/* Indicador de estado */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm text-blue-700">
            {users.length} miembros activos • {isOnline ? 'En línea' : 'Sin conexión'}
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 min-h-96 max-h-96 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 custom-scrollbar" style={{ maxHeight: '280px' }}>
            {chatMessages.map(message => (
              <div key={message.id} className={`flex items-start space-x-3 ${message.user === currentUser?.name ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                  message.team === 'comunicaciones' ? 'bg-blue-500' :
                  message.team === 'movilizacion' ? 'bg-green-500' :
                  message.team === 'jefa-campana' ? 'bg-red-500' :
                  message.team === 'presidente' ? 'bg-yellow-500' :
                  message.team === 'tesorero' ? 'bg-teal-500' :
                  'bg-gray-500'
                }`}>
                  {message.avatar}
                </div>
                <div className={`flex-1 max-w-xs ${message.user === currentUser?.name ? 'text-right' : ''}`}>
                  <div className={`rounded-lg p-3 ${
                    message.user === currentUser?.name ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <span className={`text-xs ${message.user === currentUser?.name ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </span>
                  </div>
                  {message.user !== currentUser?.name && (
                    <p className="text-xs text-gray-600 mt-1">{message.user}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input mejorado */}
          <div className="flex space-x-2 border-t pt-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions mejoradas */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => handleCall('+56912345678')}
          className="flex flex-col items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <Phone className="h-5 w-5 text-green-600 mb-1" />
          <span className="text-xs font-medium">Llamar</span>
        </button>
        <button 
          onClick={() => handleEmail('equipo@pnl.cl')}
          className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Mail className="h-5 w-5 text-blue-600 mb-1" />
          <span className="text-xs font-medium">Email</span>
        </button>
        <button 
          onClick={() => alert('Función de videollamada próximamente')}
          className="flex flex-col items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <Video className="h-5 w-5 text-purple-600 mb-1" />
          <span className="text-xs font-medium">Video</span>
        </button>
      </div>
    </div>
  );

  // Componente Recursos mejorado
  const Recursos = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recursos</h2>
        <button 
          onClick={refreshData}
          className="p-2 bg-gray-100 rounded-full"
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {/* Documentos importantes */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-bold mb-3">Documentos de Campaña</h3>
        <div className="space-y-3">
          {[
            { name: 'Plan Estratégico', desc: 'Documento principal de 9 días', color: 'blue', size: '2.4 MB', type: 'PDF' },
            { name: 'Principios PNL', desc: 'Guía ideológica oficial', color: 'green', size: '1.2 MB', type: 'PDF' },
            { name: 'Base de Afiliados', desc: 'Contactos por comuna', color: 'purple', size: '856 KB', type: 'XLSX' },
            { name: 'Propuestas Regionales', desc: 'Educación, seguridad, medio ambiente', color: 'red', size: '3.1 MB', type: 'PDF' }
          ].map((doc, index) => (
            <button
              key={index}
              onClick={() => alert(`Descargando: ${doc.name}\nTamaño: ${doc.size}\nTipo: ${doc.type}\n\nEste documento contiene información confidencial de la campaña.`)}
              className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className={`h-8 w-8 text-${doc.color}-500 mr-3`} />
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{doc.name}</p>
                <p className="text-xs text-gray-600">{doc.desc}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{doc.type}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{doc.size}</span>
                </div>
              </div>
              <Download className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Materiales gráficos */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-bold mb-3">Materiales Gráficos</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Logo PNL', type: 'PNG, SVG', color: 'blue' },
            { name: 'Infografías', type: '5 archivos', color: 'green' },
            { name: 'Videos', type: 'MP4', color: 'red' },
            { name: 'Templates RRSS', type: '10 plantillas', color: 'purple' }
          ].map((material, index) => (
            <button
              key={index}
              onClick={() => alert(`Abriendo: ${material.name}\nTipo: ${material.type}\n\nMaterial gráfico oficial para uso en campaña.`)}
              className="border rounded-lg p-3 text-center hover:bg-gray-50 transition-colors"
            >
              <div className={`w-full h-16 bg-${material.color}-100 rounded mb-2 flex items-center justify-center`}>
                <span className={`text-${material.color}-600 font-bold text-sm`}>
                  {material.name.split(' ')[0]}
                </span>
              </div>
              <p className="text-xs font-medium">{material.name}</p>
              <p className="text-xs text-gray-500">{material.type}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Enlaces útiles mejorados */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-bold mb-3">Enlaces Importantes</h3>
        <div className="space-y-2">
          {[
            { name: 'Sitio Web PNL', url: 'nacionallibertario.cl', color: 'blue', icon: 'PNL' },
            { name: 'Portal SERVEL', url: 'servel.cl', color: 'green', icon: 'GOV' },
            { name: 'WhatsApp Equipo', url: 'Chat grupal', color: 'green', icon: 'WA' },
            { name: 'Drive Campaña', url: 'Documentos compartidos', color: 'blue', icon: 'DR' }
          ].map((link, index) => (
            <button
              key={index}
              onClick={() => {
                if (link.url.includes('whatsapp') || link.url === 'Chat grupal') {
                  alert('Abriendo WhatsApp del equipo...');
                } else if (link.url === 'Documentos compartidos') {
                  alert('Abriendo Google Drive compartido...');
                } else {
                  window.open(`https://${link.url}`, '_blank');
                }
              }}
              className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 bg-${link.color}-500 rounded-full flex items-center justify-center mr-3`}>
                <span className="text-white font-bold text-xs">{link.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{link.name}</p>
                <p className="text-xs text-gray-600">{link.url}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
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
      {/* Header móvil optimizado */}
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
                <button 
                  onClick={() => {
                    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
                    setNotifications(updatedNotifications);
                    saveToStorage('campaignNotifications', updatedNotifications);
                    if (unreadNotifications > 0) {
                      alert(`${unreadNotifications} notificaciones nuevas:\n${notifications.filter(n => !n.read).map(n => `• ${n.title}`).join('\n')}`);
                    }
                  }}
                  className="p-1"
                >
                  <Bell className="h-6 w-6 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </div>
              <button 
                onClick={handleLogout}
                className="p-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
              <div className={`w-8 h-8 bg-gradient-to-br ${roleColors[currentUser?.role]} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{currentUser?.avatar}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="px-4 py-4 pb-20">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tareas' && <Tareas />}
        {activeTab === 'territorial' && <Territorial />}
        {activeTab === 'comunicaciones' && <Comunicaciones />}
        {activeTab === 'recursos' && <Recursos />}
      </main>

      {/* Navegación inferior mejorada */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-5">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (typeof window !== 'undefined' && navigator.vibrate) {
                  navigator.vibrate(50);
                }
              }}
              className={`flex flex-col items-center py-2 px-2 transition-colors relative ${
                activeTab === item.id 
                  ? 'text-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <span className="text-xs font-medium">{item.name}</span>
              {activeTab === item.id && (
                <div className="w-4 h-0.5 bg-blue-600 rounded-full mt-1"></div>
              )}
              {item.id === 'comunicaciones' && chatMessages.length > 2 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
                  {chatMessages.length}
                </div>
              )}
              {item.id === 'tareas' && tareas.filter(t => !t.completado).length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {tareas.filter(t => !t.completado).length}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Indicador de estado de conexión */}
      {!isOnline && (
        <div className="fixed top-16 left-4 right-4 bg-red-500 text-white p-2 rounded-lg text-center text-sm z-50">
          Sin conexión - Los datos se guardan localmente
        </div>
      )}
    </div>
  );
};

export default CampaignApp;
