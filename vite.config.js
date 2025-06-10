import restart from 'vite-plugin-restart'

export default {
    root: 'src/',
    publicDir: '../static/',
    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
        port: 6100 
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: ['fsevents'] 
        }
    },
    plugins: [
        restart({ restart: [ '../static/**' ] })
    ]
}
