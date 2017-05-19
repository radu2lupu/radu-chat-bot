export const Steps = [
                {
                  id: 'introduction-1',
                  message: 'Hi there!',
                  trigger: 'introduction-2',
                },
                {
                  id: 'introduction-2',
                  message: 'As you\'ve probably already guessed I\'m Radu.',
                  trigger: 'introduction-3',
                },
                {
                  id: 'introduction-3',
                  message: 'Whom might you be?',
                  trigger: 'user-name',
                },
                {
                  id: 'user-name',
                  user: true,
                  trigger: '4',
                },
];