const Footer = () => {
    return (
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8 glass">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shaikh Abdullah. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  