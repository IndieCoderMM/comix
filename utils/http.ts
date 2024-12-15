class HttpClient {
  private baseUrl?: string;
  private defaultOpts: RequestInit;

  constructor(opts: { baseUrl?: string; defaultOpts?: RequestInit }) {
    this.baseUrl = opts.baseUrl?.endsWith("/")
      ? opts.baseUrl.slice(0, -1)
      : opts.baseUrl;
    this.defaultOpts = opts.defaultOpts ?? {};
  }

  async fetch<T>(resource: string, opts: RequestInit = {}): Promise<T> {
    const url = resource.startsWith("/")
      ? `${this.baseUrl ?? ""}${resource}`
      : `${this.baseUrl ?? ""}/${resource}`;
    const finalOptions: RequestInit = { ...this.defaultOpts, ...opts };

    try {
      const response = await fetch(url, finalOptions);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`HTTP Error: ${response.status} - ${error.message}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  }
}

export default HttpClient;
