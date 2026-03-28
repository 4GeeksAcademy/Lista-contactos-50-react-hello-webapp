import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { ContactCard } from "../components/ContactCard";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Home = () => {
	const { store, actions } = useGlobalReducer();

	useEffect(() => {
		actions.getContacts();
	}, []);

	const handleDelete = async (id) => {
		const confirmed = window.confirm("¿Seguro que deseas eliminar este contacto?");
		if (confirmed) {
			await actions.deleteContact(id);
		}
	};

	return (
		<div className="app-background min-vh-100">
			<Navbar />

			<div className="container contacts-wrapper pb-5">
				<div className="contacts-box">
					{store.isLoading ? (
						<div className="text-center py-5">
							<p className="empty-message">Cargando contactos...</p>
						</div>
					) : store.contacts.length > 0 ? (
						store.contacts.map((contact) => (
							<ContactCard
								key={contact.id}
								contact={contact}
								onDelete={handleDelete}
							/>
						))
					) : (
						<div className="text-center py-5">
							<p className="empty-message">No hay contactos todavía</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};