FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CheckMateBackend/CheckMateBackend.csproj", "CheckMateBackend/"]
RUN dotnet restore "CheckMateBackend/CheckMateBackend.csproj"
COPY . .
WORKDIR "/src/CheckMateBackend"
RUN dotnet build "CheckMateBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CheckMateBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CheckMateBackend.dll"]
