import './TestCredentials.css'

export function TestCredentials() {
  const credentials = [
    {
      role: 'Адміністратор',
      email: 'admin@example.com',
      password: '123456',
      className: 'admin'
    },
    {
      role: 'Менеджер',
      email: 'manager1@example.com', 
      password: '123456',
      className: 'manager'
    },
    {
      role: 'Користувач',
      email: 'client1@example.com',
      password: '123456',
      className: 'user'
    }
  ]

  return (
    <div className="test-credentials">
      <h3 className="test-credentials-title">Тестові акаунти</h3>
      <div className="credentials-list">
        {credentials.map((cred, index) => (
          <div key={index} className={`credential-item ${cred.className}`}>
            <div className="credential-role">{cred.role}</div>
            <div className="credential-details">
              <div>
                <span className="credential-label">Email:</span>
                <div className="credential-value">
                  {cred.email}
                </div>
              </div>
              <div>
                <span className="credential-label">Пароль:</span>
                <div className="credential-value">
                  {cred.password}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="permissions-info">
        <div className="permissions-info-text">
          <div className="permissions-title">Права доступу:</div>
          <div className="permissions-list">
            <div>• Адмін: всі функції + управління користувачами</div>
            <div>• Менеджер: створення/редагування постів</div>
            <div>• Користувач: коментарі та перегляд</div>
          </div>
        </div>
      </div>
    </div>
  )
}
