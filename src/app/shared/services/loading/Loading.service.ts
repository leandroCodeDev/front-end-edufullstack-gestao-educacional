import { Injectable, TemplateRef } from '@angular/core';

export interface Notificacao {
	classname?: string;
	delay?: number;
	text?: string
}

@Injectable({ providedIn: 'root' })
export class LoadingService {
	notificacoes: Notificacao[] = [];


	showLoading(text: string = '') {
		this.show({ text,delay:1500,classname:"loading"});
		setTimeout(() => {
			this.destroyAll()
		},1500)
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
