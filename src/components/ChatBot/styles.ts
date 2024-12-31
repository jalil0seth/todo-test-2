export const chatStyles = {
  message: {
    base: 'max-w-[80%] p-2.5 rounded-lg shadow-sm',
    bot: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 text-sm',
    user: 'bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white text-sm'
  },
  container: 'flex flex-col h-full',
  messageList: 'flex-1 overflow-auto p-3 space-y-3',
  input: {
    container: 'p-3 border-t bg-white',
    wrapper: 'flex gap-2',
    field: 'flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#ff6600]/20 focus:border-[#ff6600] outline-none',
    button: 'p-2 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white rounded-lg hover:from-[#ff7711] hover:to-[#ff944d] transition-all duration-200 shadow-sm'
  }
};