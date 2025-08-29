const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { loadUserData, updateTask, saveUserData } = require('../../Handlers/dataHandler');
const { formatHourTime, formatMinTime, timeLeft } = require('../../Handlers/timeHandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List all your current and previous tasks.'),

	async execute(interaction) {

		const { user } = interaction;
		const userData = loadUserData();

		if (!userData[interaction.user.id]) {
			userData[interaction.user.id] = { tasks: [] };
			saveUserData(userData);
		}

		if (!userData[interaction.user.id].tasks || userData[interaction.user.id].tasks.length === 0) {
			await interaction.reply({ content: "You don't have any current or previous tasks.", ephemeral: true });
			return;
		}

		const userTasks = userData[interaction.user.id].tasks;
		const embedsList = [];
		const unfinishedTasks = [];
		const completedTasks = [];
		const inProgressTasks = [];

		for (const task of userTasks) {
			if (task.status === 'Completed') {
				completedTasks.push({ name: task.name, due: task.due });
			} else if (task.status === 'Unfinished') {
				unfinishedTasks.push({ name: task.name, due: task.due });
			} else {
				if (task.due != null) {
					dueDate = new Date(task.due)
					const time = timeLeft(dueDate, user.id)
					if (time == -1) {
						clearInterval(user.id, task.name)
						updateTask(user.id, task.name, 'Unfinished')
						unfinishedTasks.push({ name: task.name, due: task.due });
					} else {
						inProgressTasks.push({ name: task.name, due: task.due });
					}
				} else {
					inProgressTasks.push({ name: task.name, due: task.due });
				}
			}
		}

		completedTasks.sort((a, b) => {
			if (a.due === null) return 1;
			if (b.due === null) return -1;

			return new Date(a.due) - new Date(b.due);
		});

		unfinishedTasks.sort((a, b) => {
			if (a.due === null) return 1;
			if (b.due === null) return -1;

			return new Date(a.due) - new Date(b.due);
		});

		inProgressTasks.sort((a, b) => {
			if (a.due === null) return 1;
			if (b.due === null) return -1;

			return new Date(a.due) - new Date(b.due);
		});

		const embedComplete = new EmbedBuilder()
			.setTitle('Tasks Completed')
			.setColor('Green')

		if (completedTasks.length > 0) {
			i = 0
			for (const completedTask of completedTasks) {
				if (completedTask.due != null) {
					embedComplete.addFields(
						{ name: completedTask.name, value: `Due: ${new Date(completedTask.due).toDateString()} at ${formatHourTime(new Date(completedTask.due).getHours())}:${formatMinTime(new Date(completedTask.due).getMinutes())}`, inline: false },
					)
				} else {
					embedComplete.addFields(
						{ name: completedTask.name, value: 'Indefinite', inline: false },
					)
				}
				i += 1;
				if (i == 25) break;
			}
		} else {
			embedComplete.setFields({ name: ' ', value: 'No previous tasks completed', inline: false });
		}

		embedsList.push(embedComplete);

		const embedUnfinished = new EmbedBuilder()
			.setTitle('Tasks Unfinished')
			.setColor('Orange')

		if (unfinishedTasks.length > 0) {
			i = 0
			for (const unfinishedTask of unfinishedTasks) {
				if (unfinishedTask.due != null) {
					embedUnfinished.addFields(
						{ name: unfinishedTask.name, value: `Due: ${new Date(unfinishedTask.due).toDateString()} at ${formatHourTime(new Date(unfinishedTask.due).getHours())}:${formatMinTime(new Date(unfinishedTask.due).getMinutes())}`, inline: false },
					)
				} else {
					embedUnfinished.addFields(
						{ name: unfinishedTask.name, value: 'Indefinite', inline: false },
					)
				}
				i += 1;
				if (i == 25) break;
			}
		} else {
			embedUnfinished.setFields({ name: ' ', value: 'No previous tasks unfinished', inline: false });
		}

		embedsList.push(embedUnfinished);

		const embedInProgress = new EmbedBuilder()
			.setTitle('Tasks In Progress')
			.setColor('203D46')

		if (inProgressTasks.length > 0) {
			i = 0
			for (const inProgressTask of inProgressTasks) {
				if (inProgressTask.due != null) {
					embedInProgress.addFields(
						{ name: inProgressTask.name, value: `Due: ${new Date(inProgressTask.due).toDateString()} at ${formatHourTime(new Date(inProgressTask.due).getHours())}:${formatMinTime(new Date(inProgressTask.due).getMinutes())}`, inline: false },
					)
				} else {
					embedInProgress.addFields(
						{ name: inProgressTask.name, value: 'Indefinite', inline: false },
					)
				}
				i += 1;
				if (i == 25) break;
			}
		} else {
			embedInProgress.setFields({ name: ' ', value: 'No tasks in progress', inline: false });
		}

		embedsList.push(embedInProgress);



		await interaction.reply({ embeds: embedsList });
	},
};