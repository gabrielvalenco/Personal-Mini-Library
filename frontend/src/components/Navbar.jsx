import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { theme } = useContext(ThemeContext);
    
    // Detecta o scroll para adicionar efeito de sombra na navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Fecha o menu mobile ao clicar em um link
    const closeMenu = () => {
        setExpanded(false);
    };
    
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark mb-4 ${scrolled ? 'shadow-lg' : ''}`}>
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    Minha Biblioteca Pessoal
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded={expanded ? "true" : "false"}
                    aria-label="Toggle navigation"
                    onClick={() => setExpanded(!expanded)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                                to="/"
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                                to="/livros"
                                onClick={closeMenu}
                            >
                                Livros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                                to="/autores"
                                onClick={closeMenu}
                            >
                                Autores
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                                to="/categorias"
                                onClick={closeMenu}
                            >
                                Categorias
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                                to="/avaliacoes"
                                onClick={closeMenu}
                            >
                                Avaliações
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <NavLink className="btn btn-outline-light me-2" to="/livros/adicionar" onClick={closeMenu}>
                            <i className="bi bi-plus-circle me-1"></i> Adicionar Livro
                        </NavLink>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
