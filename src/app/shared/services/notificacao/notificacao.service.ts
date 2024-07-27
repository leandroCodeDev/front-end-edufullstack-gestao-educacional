import { Injectable, TemplateRef } from '@angular/core';

export interface Notificacao {
	classname?: string;
	delay?: number;
	text?: string
}

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
	notificacoes: Notificacao[] = [];


	showDefault(text: string) {
		this.show({ text });
	}

	showSuccess(text: string) {
		this.show({
			classname: 'bg-success text-light',
			delay: 10000,
			text
		});
	}

	showDanger(text: string) {
		this.show({
			classname: 'bg-danger text-light',
			delay: 10000,
			text,
		});
	}

	destroyAll(): void {
		this.clear();
	}

	show(notificacao: Notificacao) {
		this.notificacoes.push(notificacao);
	}

	remove(notificacao: Notificacao) {
		this.notificacoes = this.notificacoes.filter((t) => t !== notificacao);
	}

	clear() {
		this.notificacoes.splice(0, this.notificacoes.length);
	}
}
